import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { type Plan, planFor } from "akasha/code/ios-apps/app-building/app-building.module.code.ts"
import {
  answering,
  DATA,
  naming,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Answer,
  answeredWith,
  type Given,
} from "akasha/commands/modules/calling/calling.module.code.ts"
import { quoted } from "akasha/shell/quoting/quoting.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { ran as spawned } from "akasha/utils/run/running/running.module.code.ts"
import { z } from "zod"

const HOST_ENV = "AKASHA_MAC_HOST"

const DEFAULT_HOST = "macbook"

const RUN_ROOT = ".akasha-ios-build"

const SPA_SOURCE = "NATIVE_SHELL_SPA_SOURCE_DIR"

const EXCLUDES = ["node_modules", "ios", "www", "build", ".DS_Store"]

const MAC_PATH = 'export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"'

const DONE = /BUILD_SIM_OK[^\n]*udid=([0-9A-Fa-f-]{8,})/

const REPORTED = z.tuple([z.string(), z.string()])

function installedUdid(said: string): string | null {
  const found = DONE.exec(said)
  const read = REPORTED.safeParse(found)
  return read.success ? read.data[1] : null
}

export type Ran = { readonly out: string; readonly code: number }

export type Running = (command: readonly string[], named?: Record<string, string>) => Ran

export function ran(command: readonly string[], named: Record<string, string> = {}): Ran {
  const done = spawned(command, { env: { ...process.env, ...named } })
  return { out: `${done.out}${done.err}`, code: done.code }
}

function hostIn(): string {
  return optionalEnv(HOST_ENV) ?? DEFAULT_HOST
}

function delivered(
  root: string,
  plan: Plan,
  host: string,
  run: Running,
  done: string[]
): readonly string[] {
  const made = run([
    "ssh",
    host,
    plan.deliverPaths.map((rel) => `mkdir -p "$HOME/${RUN_ROOT}/${rel}"`).join("\n"),
  ])
  if (made.code !== 0) return [`${host} would not make room for the tree — ${made.out.trim()}`]
  const excluded = EXCLUDES.flatMap((one) => ["--exclude", one])
  for (const rel of plan.deliverPaths) {
    const sent = run([
      "rsync",
      "-az",
      "--delete",
      ...excluded,
      `${join(root, rel)}/`,
      `${host}:${RUN_ROOT}/${rel}/`,
    ])
    if (sent.code !== 0) return [`${rel} did not reach ${host} — ${sent.out.trim()}`]
    done.push(`${rel} under ${RUN_ROOT} on ${host}`)
  }
  if (plan.deliverFiles.length === 0) return []
  const carried = run([
    "rsync",
    "-az",
    "--relative",
    ...plan.deliverFiles.map((rel) => `${root}/./${rel}`),
    `${host}:${RUN_ROOT}/`,
  ])
  if (carried.code !== 0) {
    return [`the files every build shares did not reach ${host} — ${carried.out.trim()}`]
  }
  done.push(`the files every build shares under ${RUN_ROOT} on ${host}`)
  return []
}

function stampOf(root: string, plan: Plan, run: Running): string | null {
  const head = run(["git", "-C", root, "rev-parse", "HEAD"])
  if (head.code !== 0) return null
  const at = head.out.trim()
  if (at === "") return null
  const held = run([
    "git",
    "-C",
    root,
    "status",
    "--porcelain",
    "--",
    ...plan.deliverPaths,
    ...plan.deliverFiles,
  ])
  return held.out.trim() === "" ? at : `${at}-dirty`
}

function scriptOf(root: string, plan: Plan, stamp: string): string {
  const shellDir = `$HOME/${RUN_ROOT}/${plan.shellPath}`
  const head = [
    MAC_PATH,
    `export NATIVE_SHELL_DIR="${shellDir}"`,
    `export NATIVE_SHELL_TREE_ROOT="$HOME/${RUN_ROOT}"`,
    `export NATIVE_SHELL_SYNC_SCRIPT="$HOME/${RUN_ROOT}/${plan.syncScriptPath}"`,
    `export NATIVE_SHELL_DEPENDENCIES=${quoted(JSON.stringify(plan.dependencies))}`,
    `export NATIVE_SHELL_PLUGINS=${quoted(Object.keys(plan.dependencies).join(" "))}`,
    `export NATIVE_SHELL_STAMP_COMMIT='${stamp}'`,
    ...plan.exports,
  ]
  return `${head.join("\n")}\n${readFileSync(join(root, plan.buildScriptPath), "utf8")}`
}

function built(script: string, host: string, run: Running, done: string[]): Ran {
  const held = mkdtempSync(join(SCRATCH_AT, "akasha-ios-build-"))
  const at = join(held, "build.sh")
  const there = `$HOME/${RUN_ROOT}/build.sh`
  try {
    writeFileSync(at, script, { mode: 0o600 })
    const sent = run(["rsync", "-a", "--chmod=F600", at, `${host}:${RUN_ROOT}/build.sh`])
    if (sent.code !== 0) return { out: `the build could not be sent — ${sent.out.trim()}`, code: 3 }
    done.push(`the build script under ${RUN_ROOT} on ${host}`)
    return run(["ssh", host, `trap 'rm -f ${there}' EXIT HUP INT TERM; bash ${there}`])
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function installedFrom(
  root: string,
  plan: Plan,
  host: string,
  run: Running,
  done: string[]
): Answer {
  const report = [
    `building ${plan.appSlug} on ${host} from ${plan.deliverPaths.length} directories` +
      ` and ${plan.deliverFiles.length} files of the pages every build compiles`,
  ]
  if (plan.staging !== null) {
    const from = join(root, plan.staging.sourcePath)
    const staged = run(["bash", join(root, plan.staging.scriptPath)], { [SPA_SOURCE]: from })
    report.push(staged.out.trimEnd())
    if (staged.code !== 0) {
      return answeredWith(
        report,
        [`the site ${plan.appSlug} serves was not staged from ${from}`],
        OPERATIONAL
      )
    }
    done.push(`the site ${plan.appSlug} serves, staged from ${from}`)
    report.push(`staged the site ${plan.appSlug} serves from ${from}`)
  }
  const short = delivered(root, plan, host, run, done)
  if (short.length > 0) return answeredWith(report, short, OPERATIONAL)
  const stamp = stampOf(root, plan, run)
  if (stamp === null) {
    return answeredWith(
      report,
      [
        `the commit ${root} is at could not be read, and a build stamped with nothing cannot be told from a stale one`,
      ],
      OPERATIONAL
    )
  }
  const made = built(scriptOf(root, plan, stamp), host, run, done)
  report.push(made.out.trimEnd())
  const udid = installedUdid(made.out)
  if (udid === null) {
    return answeredWith(
      report,
      [`${plan.appSlug} did not report BUILD_SIM_OK, so it was neither built nor installed`],
      OPERATIONAL
    )
  }
  report.push(`installed ${plan.appSlug} to simulator ${udid}`)
  return told(report)
}

export function installedBy(root: string, plan: Plan, host: string, run: Running): Promise<Answer> {
  return answering((done) => naming(done, installedFrom(root, plan, host, run, done)))
}

export async function installedOnSimulator(
  slug: string,
  given: Given,
  run: Running = ran
): Promise<Answer> {
  const plan = planFor(given.root, slug)
  if ("refused" in plan) return refusedBy([...plan.refused], DATA)
  return await installedBy(given.root, plan, hostIn(), run)
}
