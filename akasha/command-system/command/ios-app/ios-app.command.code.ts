import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Plan,
  planFor,
} from "../../../code-system/ios-app/app-building/app-building.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

export const BUILD = "build"

const ACTS = [BUILD]

const HOST_ENV = "AKASHA_MAC_HOST"

const DEFAULT_HOST = "macbook"

const RUN_ROOT = ".akasha-ios-build"

const SCRATCH_AT = "/var/tmp"

const EXCLUDES = ["node_modules", "ios", "build", ".DS_Store"]

const MAC_PATH = 'export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"'

const DONE = /BUILD_SIM_OK[^\n]*udid=([0-9A-Fa-f-]{8,})/

export type Read = { readonly act: string; readonly app: string } | { readonly refused: string }

export function readIn(argv: readonly string[]): Read {
  const [act, app, ...rest] = argv
  if (act === undefined)
    return { refused: `this names no act — it carries \`${ACTS.join("`, `")}\`` }
  if (!ACTS.includes(act)) {
    return { refused: `\`${act}\` is no act this carries — it carries \`${ACTS.join("`, `")}\`` }
  }
  if (app === undefined) return { refused: `\`${act}\` names an app, and nothing followed it` }
  if (rest.length > 0) {
    return {
      refused: `\`${rest.join("`, `")}\` follows the app \`${app}\`, and one call names one app`,
    }
  }
  return { act, app }
}

function said(chunk: Uint8Array | null): string {
  return chunk === null ? "" : new TextDecoder().decode(chunk)
}

type Ran = { readonly out: string; readonly code: number }

function ran(command: readonly string[]): Ran {
  const done = Bun.spawnSync([...command], { stdout: "pipe", stderr: "pipe" })
  return { out: `${said(done.stdout)}${said(done.stderr)}`, code: done.exitCode }
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

function scriptOf(root: string, plan: Plan): string {
  const shellDir = `$HOME/${RUN_ROOT}/${plan.shellPath}`
  const head = [MAC_PATH, `export NATIVE_SHELL_DIR="${shellDir}"`, ...plan.exports]
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
  const short = delivered(given.root, plan, host)
  if (short.length > 0) return { report, refusals: short, code: 3 }
  const done = built(scriptOf(given.root, plan), host)
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
