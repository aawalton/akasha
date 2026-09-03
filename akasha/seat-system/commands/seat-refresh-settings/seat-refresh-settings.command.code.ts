import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import {
  AGENT_SETTINGS_PATH,
  readAgentSettingsBase,
  refreshedSettings,
} from "../../supervising/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"

const JSON_FLAG = "--json"

const SETTINGS_FLAG = "--settings"

const SETTINGS_STEM = "agent-settings-"

const SETTINGS_ENDING = ".json"

const PROC = "/proc"

const DIGITS = /^\d+$/

const NOTHING_LIVE =
  "no running process names a spawned settings file, which on this workstation means the scan " +
  "found nothing rather than that the fleet is empty"

export type Outcome = "refreshed" | "unchanged" | "unreadable"

export type Row = {
  readonly path: string
  readonly outcome: Outcome
}

export function settingsPathIn(argv: readonly string[]): string | null {
  const at = argv.indexOf(SETTINGS_FLAG)
  if (at === -1) return null
  const named = argv[at + 1]
  return named === undefined || named === "" ? null : named
}

export function isSpawnedSettings(path: string): boolean {
  return basename(path).startsWith(SETTINGS_STEM) && path.endsWith(SETTINGS_ENDING)
}

export function liveSettingsPaths(root: string = PROC): readonly string[] {
  const found = new Set<string>()
  for (const entry of readdirSync(root)) {
    if (!DIGITS.test(entry)) continue
    let argv: readonly string[]
    try {
      argv = readFileSync(`${root}/${entry}/cmdline`, "utf8").split("\0")
    } catch {
      continue
    }
    const named = settingsPathIn(argv)
    if (named !== null && isSpawnedSettings(named)) found.add(named)
  }
  return [...found].sort()
}

export function objectIn(said: string): Record<string, unknown> | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(said)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  return parsed as Record<string, unknown>
}

export function refreshedAt(path: string, base: Record<string, unknown>): Row {
  let was: string
  try {
    was = readFileSync(path, "utf8")
  } catch {
    return { path, outcome: "unreadable" }
  }
  const existing = objectIn(was)
  if (existing === null) return { path, outcome: "unreadable" }
  const contents = JSON.stringify(refreshedSettings(existing, base))
  if (contents === was) return { path, outcome: "unchanged" }
  writeFileSync(path, contents)
  return { path, outcome: "refreshed" }
}

export async function seatRefreshSettings(argv: readonly string[]): Promise<Answer> {
  const stray = argv.filter((one) => one !== JSON_FLAG)
  if (stray.length > 0) {
    const said = stray.map((one) => `\`${one}\``).join(", ")
    return {
      report: [],
      refusals: [`this takes \`${JSON_FLAG}\` and nothing else, and ${said} was said`],
      code: 1,
    }
  }
  const base = await readAgentSettingsBase()
  if (base.kind !== "loaded") {
    return {
      report: [],
      refusals: [
        `${AGENT_SETTINGS_PATH} would not read, so there is nothing to write: ${base.reason}`,
      ],
      code: 2,
    }
  }
  let paths: readonly string[]
  try {
    paths = liveSettingsPaths()
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
  if (paths.length === 0) return { report: [], refusals: [NOTHING_LIVE], code: 2 }
  const rows = paths.map((path) => refreshedAt(path, base.settings))
  if (argv.includes(JSON_FLAG)) {
    return { report: [JSON.stringify({ rows })], refusals: [], code: 0 }
  }
  return { report: rows.map((row) => `${row.path}\t${row.outcome}`), refusals: [], code: 0 }
}
