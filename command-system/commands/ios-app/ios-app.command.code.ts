import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { type Plan, planFor } from "@akasha/code-system/app-building"
import { ran as running } from "@akasha/utils-run/running"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

export const BUILD = "build"

export const WWW = "--www"

const ACTS = [BUILD]

const HOST_ENV = "AKASHA_MAC_HOST"

const DEFAULT_HOST = "macbook"

const RUN_ROOT = ".akasha-ios-build"

const SCRATCH_AT = "/var/tmp"

const WWW_AT = "www-staged"

const SPA_SOURCE = "NATIVE_SHELL_SPA_SOURCE_DIR"

const EXCLUDES = ["node_modules", "ios", "build", ".DS_Store"]

const MAC_PATH = 'export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"'

const DONE = /BUILD_SIM_OK[^\n]*udid=([0-9A-Fa-f-]{8,})/

export type Read =
  | { readonly act: string; readonly app: string; readonly www: string | null }
  | { readonly refused: string }

const acts = (): string => ACTS.join("`, `")

export function readIn(argv: readonly string[]): Read {
  const bare: string[] = []
  let www: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === WWW) {
      const value = argv[at + 1]
      if (value === undefined)
        return { refused: `\`${WWW}\` names a directory, and nothing followed it` }
      www = value
      at += 1
      continue
    }
    if (one.startsWith("-")) {
      return { refused: `\`${one}\` is no flag this takes — it takes \`${WWW} <dir>\`` }
    }
    bare.push(one)
  }
  const [act, app, ...rest] = bare
  if (act === undefined) return { refused: `this names no act — it carries \`${acts()}\`` }
  if (!ACTS.includes(act)) {
    return { refused: `\`${act}\` is no act this carries — it carries \`${acts()}\`` }
  }
  if (app === undefined) return { refused: `\`${act}\` names an app, and nothing followed it` }
  if (rest.length > 0) {
    return {
      refused: `\`${rest.join("`, `")}\` follows the app \`${app}\`, and one call names one app`,
    }
  }
  return { act, app, www }
}

type Ran = { readonly out: string; readonly code: number }

function ran(command: readonly string[], named: Record<string, string> = {}): Ran {
  const done = running(command, { env: { ...process.env, ...named } })
  return { out: `${done.out}${done.err}`, code: done.code }
}

function hostIn(): string {
  const named = process.env[HOST_ENV]
  return named === undefined || named === "" ? DEFAULT_HOST : named
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
  return []
}

function stampOf(root: string, plan: Plan): string | null {
  const head = ran(["git", "-C", root, "rev-parse", "HEAD"])
  if (head.code !== 0) return null
  const at = head.out.trim()
  if (at === "") return null
  const held = ran(["git", "-C", root, "status", "--porcelain", "--", ...plan.deliverPaths])
  return held.out.trim() === "" ? at : `${at}-dirty`
}

function scriptOf(root: string, plan: Plan, www: string | null, stamp: string): string {
  const shellDir = `$HOME/${RUN_ROOT}/${plan.shellPath}`
  const head = [
    MAC_PATH,
    `export NATIVE_SHELL_DIR="${shellDir}"`,
    `export NATIVE_SHELL_STAMP_COMMIT='${stamp}'`,
    ...plan.exports,
  ]
  if (www !== null) head.push(`export STAGED_WWW_DIR="$HOME/${RUN_ROOT}/${WWW_AT}"`)
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

export function iosApp(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: [read.refused], code: 1 }
  const plan = planFor(given.root, read.app)
  if ("refused" in plan) return { report: [], refusals: [...plan.refused], code: 2 }
  const host = hostIn()
  const report = [
    `building ${plan.appSlug} on ${host} from ${plan.deliverPaths.length} directories`,
  ]
  if (read.www === null && plan.staging !== null) {
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
  if (read.www !== null) {
    const sent = ran(["rsync", "-az", "--delete", `${read.www}/`, `${host}:${RUN_ROOT}/${WWW_AT}/`])
    if (sent.code !== 0) {
      return {
        report,
        refusals: [`${read.www} did not reach ${host} — ${sent.out.trim()}`],
        code: 3,
      }
    }
    report.push(`staged the site standing at ${read.www}`)
  }
  const stamp = stampOf(given.root, plan)
  if (stamp === null) {
    return {
      report,
      refusals: [
        `the commit ${given.root} stands at could not be read, and a build stamped with nothing cannot be told from a stale one`,
      ],
      code: 3,
    }
  }
  const done = built(scriptOf(given.root, plan, read.www, stamp), host)
  report.push(done.out.trimEnd())
  const found = DONE.exec(done.out)
  if (found === null) {
    return {
      report,
      refusals: [
        `${plan.appSlug} did not report BUILD_SIM_OK, so it was neither built nor installed`,
      ],
      code: 3,
    }
  }
  report.push(`installed ${plan.appSlug} to simulator ${found[1]}`)
  return { report, refusals: [], code: 0 }
}
