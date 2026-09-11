import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Plan,
  planFor,
} from "akasha/code-system/ios-apps/app-building/app-building.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { SCRATCH_AT } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { ran as running } from "akasha/utils/run/running/running.module.code.ts"
import { z } from "zod"

const DATA = 2

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

type Ran = { readonly out: string; readonly code: number }

function ran(command: readonly string[], named: Record<string, string> = {}): Ran {
  const done = running(command, { env: { ...process.env, ...named } })
  return { out: `${done.out}${done.err}`, code: done.code }
}

function hostIn(): string {
  return optionalEnv(HOST_ENV) ?? DEFAULT_HOST
}

function delivered(root: string, plan: Plan, host: string): readonly string[] {
  const made = ran([
    "ssh",
    host,
    plan.deliverPaths.map((rel) => `mkdir -p "$HOME/${RUN_ROOT}/${rel}"`).join("\n"),
  ])
  if (made.code !== 0) return [`${host} would not make room for the tree — ${made.out.trim()}`]
  const excluded = EXCLUDES.flatMap((one) => ["--exclude", one])
  for (const rel of plan.deliverPaths) {
    const sent = ran([
      "rsync",
      "-az",
      "--delete",
      ...excluded,
      `${join(root, rel)}/`,
      `${host}:${RUN_ROOT}/${rel}/`,
    ])
    if (sent.code !== 0) return [`${rel} did not reach ${host} — ${sent.out.trim()}`]
  }
  if (plan.deliverFiles.length === 0) return []
  const carried = ran([
    "rsync",
    "-az",
    "--relative",
    ...plan.deliverFiles.map((rel) => `${root}/./${rel}`),
    `${host}:${RUN_ROOT}/`,
  ])
  if (carried.code !== 0) {
    return [`the files every build shares did not reach ${host} — ${carried.out.trim()}`]
  }
  return []
}

function stampOf(root: string, plan: Plan): string | null {
  const head = ran(["git", "-C", root, "rev-parse", "HEAD"])
  if (head.code !== 0) return null
  const at = head.out.trim()
  if (at === "") return null
  const held = ran([
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
    `export NATIVE_SHELL_STAMP_COMMIT='${stamp}'`,
    ...plan.exports,
  ]
  return `${head.join("\n")}\n${readFileSync(join(root, plan.buildScriptPath), "utf8")}`
}

function built(script: string, host: string): Ran {
  const held = mkdtempSync(join(SCRATCH_AT, "akasha-ios-build-"))
  const at = join(held, "build.sh")
  const there = `$HOME/${RUN_ROOT}/build.sh`
  try {
    writeFileSync(at, script, { mode: 0o600 })
    const sent = ran(["rsync", "-a", "--chmod=F600", at, `${host}:${RUN_ROOT}/build.sh`])
    if (sent.code !== 0) return { out: `the build could not be sent — ${sent.out.trim()}`, code: 3 }
    return ran(["ssh", host, `trap 'rm -f ${there}' EXIT HUP INT TERM; bash ${there}`])
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function installedOnSimulator(slug: string, given: Given): Answer {
  const plan = planFor(given.root, slug)
  if ("refused" in plan) return { report: [], refusals: [...plan.refused], code: DATA }
  const host = hostIn()
  const report = [
    `building ${plan.appSlug} on ${host} from ${plan.deliverPaths.length} directories` +
      ` and ${plan.deliverFiles.length} files of the pages every build compiles`,
  ]
  if (plan.staging !== null) {
    const from = join(given.root, plan.staging.sourcePath)
    const made = ran(["bash", join(given.root, plan.staging.scriptPath)], { [SPA_SOURCE]: from })
    report.push(made.out.trimEnd())
    if (made.code !== 0) {
      return {
        report,
        refusals: [`the site ${plan.appSlug} serves was not staged from ${from}`],
        code: 3,
      }
    }
    report.push(`staged the site ${plan.appSlug} serves from ${from}`)
  }
  const short = delivered(given.root, plan, host)
  if (short.length > 0) return { report, refusals: short, code: 3 }
  const stamp = stampOf(given.root, plan)
  if (stamp === null) {
    return {
      report,
      refusals: [
        `the commit ${given.root} is at could not be read, and a build stamped with nothing cannot be told from a stale one`,
      ],
      code: 3,
    }
  }
  const done = built(scriptOf(given.root, plan, stamp), host)
  report.push(done.out.trimEnd())
  const udid = installedUdid(done.out)
  if (udid === null) {
    return {
      report,
      refusals: [
        `${plan.appSlug} did not report BUILD_SIM_OK, so it was neither built nor installed`,
      ],
      code: 3,
    }
  }
  report.push(`installed ${plan.appSlug} to simulator ${udid}`)
  return { report, refusals: [], code: 0 }
}
