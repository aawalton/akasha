import type { BarmanTarget } from "../barman/barman.module.code.ts"
import {
  listBackups,
  markStandalone,
  readKeepState,
  releaseKeep,
} from "../barman/barman.module.code.ts"
import { decideKeepActions } from "../decide-keeps/decide-keeps.module.code.ts"
import type {
  GfsAlertEnvelope,
  KeepDisagreement,
  KeepState,
} from "../keep-decision/keep-decision.module.code.ts"
import { envSchema } from "../retention-env/retention-env.module.code.ts"

const WEEKLY_KEEP_COUNT = 4
const MONTHLY_KEEP_COUNT = 12

function alertAndFail(disagreements: readonly KeepDisagreement[]): never {
  for (const d of disagreements) console.error(`gfs-promoter: DISAGREEMENT ${d.message}`)
  const envelope: GfsAlertEnvelope = {
    wedge_class: "gfs-promoter-disagreement",
    state: "new",
    evidence: { disagreements },
    snapshot_at: new Date().toISOString(),
  }
  console.error(`gfs-promoter: WEDGE ${JSON.stringify(envelope)}`)
  process.exit(1)
}

async function main(): Promise<undefined> {
  const env = envSchema.parse(process.env)
  const target: BarmanTarget = {
    endpointUrl: env.BARMAN_ENDPOINT_URL,
    sourceUrl: env.BARMAN_SOURCE_URL,
    serverName: env.BARMAN_SERVER_NAME,
  }

  const backups = await listBackups(target)
  const done = backups.filter((backup) => backup.status === "DONE")
  console.log(`gfs-promoter: listed ${backups.length} backups (${done.length} DONE)`)

  const keepStates: Record<string, KeepState> = {}
  for (const backup of done) {
    keepStates[backup.backupId] = await readKeepState(target, backup.backupId)
  }

  const decision = decideKeepActions({
    backups,
    keepStates,
    todayUtc: new Date().toISOString().slice(0, 10),
    weeklyKeepCount: WEEKLY_KEEP_COUNT,
    monthlyKeepCount: MONTHLY_KEEP_COUNT,
  })
  console.log(
    `gfs-promoter: weekly anchors [${decision.weeklyAnchors.join(", ")}] monthly anchors [${decision.monthlyAnchors.join(", ")}]`
  )
  for (const action of decision.actions) {
    console.log(`gfs-promoter: plan ${action.kind} ${action.backupId} (${action.reason})`)
  }

  if (env.DRY_RUN === "1") {
    console.log(`gfs-promoter: DRY_RUN — ${decision.actions.length} actions not applied`)
    if (decision.disagreements.length > 0) {
      for (const d of decision.disagreements)
        console.error(`gfs-promoter: DISAGREEMENT ${d.message}`)
      process.exit(1)
    }
    return
  }

  const disagreements: KeepDisagreement[] = [...decision.disagreements]
  for (const action of decision.actions) {
    const expected: KeepState = action.kind === "mark-standalone" ? "standalone" : "nokeep"
    if (action.kind === "mark-standalone") await markStandalone(target, action.backupId)
    else await releaseKeep(target, action.backupId)
    const observed = await readKeepState(target, action.backupId)
    if (observed !== expected) {
      disagreements.push({
        kind: "backup",
        backupId: action.backupId,
        found: observed,
        message: `after ${action.kind} on ${action.backupId}, keep status re-read as '${observed}' (expected '${expected}')`,
      })
    } else {
      console.log(`gfs-promoter: applied ${action.kind} ${action.backupId}`)
    }
  }

  if (disagreements.length > 0) alertAndFail(disagreements)
  console.log(`gfs-promoter: reconcile complete, ${decision.actions.length} actions applied`)
}

if (import.meta.main) {
  main().catch((err: unknown) => {
    console.error("gfs-promoter: run failed", err)
    process.exit(1)
  })
}
