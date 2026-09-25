import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Plan,
  planFor,
} from "akasha/code/ios-app/modules/app-building/app-building.module.code.ts"
import { quoted } from "akasha/code/shell/modules/quoting/quoting.module.code.ts"
import { ran as spawned } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  answeredWith,
  answering,
  DATA,
  naming,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { SCRATCH_AT } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { z } from "zod"

const HOST_ENV = "AKASHA_MAC_HOST"

const DEFAULT_HOST = "macbook"

const RUN_ROOT = ".akasha-ios-build"

const EXCLUDES = ["node_modules", "ios", "www", "build", ".DS_Store"]

const MAC_PATH = 'export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"'

const DONE = /BUILD_SIM_OK[^\n]*udid=([0-9A-Fa-f-]{8,})/

const REPORTED = z.tuple([z.string(), z.string()])

function installedUdid(said: string): string | null {
  const found = DONE.exec(said)
  const read = REPORTED.safeParse(found)
  return read.success ? read.data[1] : null
}

type Ran = { readonly out: string; readonly code: number }

export type Running = (command: readonly string[], named?: Record<string, string>) => Ran

function ran(command: readonly string[], named: Record<string, string> = {}): Ran {
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

type Written = { readonly at: string } | { readonly refused: readonly string[] }

function writtenOut(root: string, commit: string, plan: Plan, run: Running): Written {
  const at = mkdtempSync(join(SCRATCH_AT, "akasha-ios-tree-"))
  const paths = [...plan.deliverPaths, ...plan.deliverFiles, plan.buildScriptPath]
  const archived = ["git", "-C", root, "archive", commit, ...paths].map(quoted).join(" ")
  const made = run(["bash", "-o", "pipefail", "-c", `${archived} | tar -x -C ${quoted(at)}`])
  if (made.code === 0) return { at }
  rmSync(at, { recursive: true, force: true })
  const why = `the files ${plan.appSlug} is built from could not be written out of ${commit}`
  return { refused: [`${why} — ${made.out.trim()}`] }
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
  stamp: string,
  host: string,
  run: Running,
  done: string[]
): Answer {
  const report = [
    `building ${plan.appSlug} on ${host} from ${plan.deliverPaths.length} directories` +
      ` and ${plan.deliverFiles.length} files of the pages every build compiles`,
  ]
  const short = delivered(root, plan, host, run, done)
  if (short.length > 0) return answeredWith(report, short, OPERATIONAL)
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

export function installedBy(
  root: string,
  plan: Plan,
  stamp: string,
  host: string,
  run: Running
): Promise<Answer> {
  return answering((done) => naming(done, installedFrom(root, plan, stamp, host, run, done)))
}

export async function installedOnSimulator(
  slug: string,
  given: Given,
  commit: string,
  run: Running = ran
): Promise<Answer> {
  const plan = planFor(pagesAt(given.root, commit), slug)
  if ("refused" in plan) return refusedBy([...plan.refused], DATA)
  const tree = writtenOut(given.root, commit, plan, run)
  if ("refused" in tree) return refusedBy([...tree.refused], OPERATIONAL)
  try {
    return await installedBy(tree.at, plan, commit, hostIn(), run)
  } finally {
    rmSync(tree.at, { recursive: true, force: true })
  }
}
