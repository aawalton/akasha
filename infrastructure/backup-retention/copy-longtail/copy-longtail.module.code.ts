import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import {
  attestationLogLines,
  attestationProbeProblem,
} from "../backup-attestation/backup-attestation.module.code.ts"
import { parseBackupInfo } from "../backup-info/backup-info.module.code.ts"
import type {
  LongtailBackup,
  LongtailUnit,
} from "../decide-longtail/decide-longtail.module.code.ts"
import {
  decideLongtailUnits,
  decidePrunes,
  isHistoryFile,
  walFilesInRange,
  walPrefixDirsInRange,
} from "../decide-longtail/decide-longtail.module.code.ts"
import type { GfsAlertEnvelope } from "../keep-decision/keep-decision.module.code.ts"
import {
  rcloneCat,
  rcloneCopy,
  rcloneCopyFilesFrom,
  rcloneLsf,
  rcloneSha256,
} from "../rclone/rclone.module.code.ts"
import { longtailEnvSchema } from "../retention-env/retention-env.module.code.ts"

interface Roots {
  readonly srcBucket: string
  readonly serverRoot: string
  readonly longtailRoot: string
  readonly monthlyRoot: string
}

function rootsOf(env: z.infer<typeof longtailEnvSchema>): Roots {
  const srcBucket = `src:${env.LONGTAIL_BUCKET}`
  const longtailRoot = `${env.BACKUP_MOUNT}/_longtail`
  return {
    srcBucket,
    serverRoot: `${srcBucket}/${env.BARMAN_SERVER_NAME}`,
    longtailRoot,
    monthlyRoot: `${longtailRoot}/monthly`,
  }
}

function alertAranyaAndFail(envelope: GfsAlertEnvelope): never {
  console.error(`backup-longtail: WEDGE ${JSON.stringify(envelope)}`)
  process.exit(1)
}

async function listLongtailBackups(roots: Roots): Promise<readonly LongtailBackup[]> {
  const ids = await rcloneLsf(`${roots.serverRoot}/base`, { dirsOnly: true })
  console.log(`backup-longtail: listed ${ids.length} base backup dirs`)
  const backups: LongtailBackup[] = []
  for (const id of ids) {
    const files = await rcloneLsf(`${roots.serverRoot}/base/${id}`, { filesOnly: true })
    if (!files.includes("backup.info")) {
      console.log(`backup-longtail: skip ${id} — no backup.info yet (in-progress backup)`)
      continue
    }
    const info = parseBackupInfo(await rcloneCat(`${roots.serverRoot}/base/${id}/backup.info`))
    backups.push({
      backupId: id,
      beginTimeIso: info.beginTimeIso,
      status: info.status,
      beginWal: info.beginWal,
      endWal: info.endWal,
    })
  }
  return backups
}

function readExistingUnits(roots: Roots): {
  readonly existingIds: readonly string[]
  readonly completeIds: readonly string[]
} {
  mkdirSync(roots.monthlyRoot, { recursive: true })
  const existingIds = readdirSync(roots.monthlyRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
  const completeIds = existingIds.filter((id) =>
    existsSync(`${roots.monthlyRoot}/${id}/UNIT_COMPLETE.json`)
  )
  return { existingIds, completeIds }
}

async function materializeUnit(roots: Roots, unit: LongtailUnit): Promise<undefined> {
  const unitDir = `${roots.monthlyRoot}/${unit.backupId}`
  const baseSrc = `${roots.serverRoot}/base/${unit.backupId}`
  console.log(`backup-longtail: copying unit ${unit.backupId} (${unit.reason})`)

  const remoteBaseFiles = await rcloneLsf(baseSrc, { filesOnly: true })
  await rcloneCopy(baseSrc, `${unitDir}/base`)

  const prefixDirs = await rcloneLsf(`${roots.serverRoot}/wals`, { dirsOnly: true })
  const inRangeDirs = walPrefixDirsInRange(prefixDirs, unit.beginWal, unit.endWal)
  const wantedByDir = new Map<string, readonly string[]>()
  for (const dir of inRangeDirs) {
    const files = await rcloneLsf(`${roots.serverRoot}/wals/${dir}`, { filesOnly: true })
    const wanted = walFilesInRange(files, unit.beginWal, unit.endWal)
    wantedByDir.set(dir, wanted)
    if (wanted.length > 0) {
      await rcloneCopyFilesFrom(`${roots.serverRoot}/wals/${dir}`, `${unitDir}/wals/${dir}`, wanted)
    }
  }

  const topLevelFiles = await rcloneLsf(`${roots.serverRoot}/wals`, { filesOnly: true })
  const historyFiles = topLevelFiles.filter(isHistoryFile)
  if (historyFiles.length > 0) {
    await rcloneCopyFilesFrom(`${roots.serverRoot}/wals`, `${unitDir}/wals`, historyFiles)
  }

  const localBaseFiles = await rcloneLsf(`${unitDir}/base`, { filesOnly: true })
  if (localBaseFiles.length !== remoteBaseFiles.length) {
    throw new Error(
      `unit ${unit.backupId}: copied ${localBaseFiles.length} base files, remote has ${remoteBaseFiles.length}`
    )
  }
  let walFileCount = 0
  for (const [dir, wanted] of wantedByDir) {
    if (wanted.length === 0) continue
    const localWalFiles = await rcloneLsf(`${unitDir}/wals/${dir}`, { filesOnly: true })
    if (localWalFiles.length !== wanted.length) {
      throw new Error(
        `unit ${unit.backupId}: wals/${dir} copied ${localWalFiles.length} files, expected ${wanted.length}`
      )
    }
    walFileCount += wanted.length
  }

  const sha256Lines = await rcloneSha256(unitDir)
  for (const logLine of attestationLogLines(unit.backupId, sha256Lines)) {
    console.log(logLine)
  }

  await Bun.write(
    `${unitDir}/UNIT_COMPLETE.json`,
    JSON.stringify(
      {
        backupId: unit.backupId,
        beginWal: unit.beginWal,
        endWal: unit.endWal,
        reason: unit.reason,
        copiedAt: new Date().toISOString(),
        baseFileCount: remoteBaseFiles.length,
        walFileCount,
      },
      null,
      2
    )
  )
  console.log(
    `backup-longtail: unit ${unit.backupId} complete (${remoteBaseFiles.length} base files, ${walFileCount} wal files)`
  )
}

async function copyAnnual(roots: Roots): Promise<undefined> {
  try {
    await rcloneCopy(`${roots.srcBucket}/annual`, `${roots.longtailRoot}/annual`)
    console.log("backup-longtail: annual prefix copied")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("directory not found")) {
      console.log("backup-longtail: no annual prefix yet")
      return
    }
    throw err
  }
}

const duKibTuple = z.tuple([z.coerce.number().int().nonnegative()])

async function duBytes(path: string): Promise<number> {
  const proc = Bun.spawn(["du", "-sk", path], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) {
    throw new Error(`du -sk ${path} exited ${exitCode}: ${stderr.trim()}`)
  }
  const [kib] = requireMatchPositional(/^(\d+)\s/, duKibTuple, stdout, `du output for ${path}`)
  return kib * 1024
}

const PROBE_BYTES = "seaweedfs-backup-longtail attestation probe\n"

async function preflightAttestation(): Promise<undefined> {
  const probeDir = mkdtempSync("/var/tmp/longtail-attest-probe-")
  try {
    const probeName = "probe"
    writeFileSync(join(probeDir, probeName), PROBE_BYTES)
    const expectedDigest = new Bun.CryptoHasher("sha256").update(PROBE_BYTES).digest("hex")
    const lines = await rcloneSha256(probeDir)
    const problem = attestationProbeProblem(lines, expectedDigest, probeName)
    if (problem !== null) {
      throw new Error(`attestation preflight: ${problem}`)
    }
    console.log("backup-longtail: attestation preflight ok")
  } finally {
    rmSync(probeDir, { recursive: true, force: true })
  }
}

async function main(): Promise<undefined> {
  const env = longtailEnvSchema.parse(process.env)
  const roots = rootsOf(env)
  try {
    await preflightAttestation()
    const backups = await listLongtailBackups(roots)
    const units = decideLongtailUnits({
      backups,
      todayUtc: new Date().toISOString().slice(0, 10),
      monthlyKeepCount: env.MONTHLY_KEEP_COUNT,
    })
    const desiredIds = units.map((unit) => unit.backupId)
    const { existingIds, completeIds } = readExistingUnits(roots)
    const complete = new Set(completeIds)
    const toCopy = units.filter((unit) => !complete.has(unit.backupId))
    const prunes = decidePrunes(existingIds, desiredIds)

    console.log(
      `backup-longtail: desired [${desiredIds.join(", ")}] complete [${completeIds.join(", ")}]`
    )
    for (const unit of toCopy) {
      console.log(`backup-longtail: plan copy ${unit.backupId} (${unit.reason})`)
    }
    for (const id of prunes) console.log(`backup-longtail: plan prune ${id}`)

    if (env.DRY_RUN === "1") {
      console.log(
        `backup-longtail: DRY_RUN — ${toCopy.length} copies + ${prunes.length} prunes not applied`
      )
      return
    }

    for (const unit of toCopy) await materializeUnit(roots, unit)

    for (const id of prunes) {
      rmSync(`${roots.monthlyRoot}/${id}`, { recursive: true, force: true })
      console.log(`backup-longtail: pruned ${id}`)
    }

    await copyAnnual(roots)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`backup-longtail: run failed — ${message}`)
    alertAranyaAndFail({
      wedge_class: "backup-longtail-failure",
      state: "new",
      evidence: { message },
      snapshot_at: new Date().toISOString(),
    })
  }

  const usedBytes = await duBytes(env.BACKUP_MOUNT)
  const longtailBytes = await duBytes(roots.longtailRoot)
  const budgetBytes = env.LONGTAIL_BUDGET_BYTES
  console.log(
    `backup-longtail: capacity ${usedBytes}/${budgetBytes} bytes used (_longtail: ${longtailBytes})`
  )
  if (usedBytes > budgetBytes * env.LONGTAIL_ALERT_THRESHOLD) {
    console.error(`backup-longtail: usage exceeds ${env.LONGTAIL_ALERT_THRESHOLD * 100}% of budget`)
    alertAranyaAndFail({
      wedge_class: "backup-longtail-capacity",
      state: "new",
      evidence: { usedBytes, budgetBytes, subtrees: { _longtail: longtailBytes } },
      snapshot_at: new Date().toISOString(),
    })
  }
  console.log("backup-longtail: reconcile complete")
}

if (import.meta.main) {
  main().catch((err: unknown) => {
    console.error("backup-longtail: run failed", err)
    process.exit(1)
  })
}
