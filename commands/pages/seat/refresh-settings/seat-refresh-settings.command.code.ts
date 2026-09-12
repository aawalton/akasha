import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename } from "node:path"
import {
  asJson,
  DATA,
  OPERATIONAL,
  partWay,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  AGENT_SETTINGS_PATH,
  readAgentSettingsBase,
  refreshedSettings,
} from "akasha/seat-system/supervising/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

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

export type Refreshing = (path: string, base: Record<string, unknown>) => Row

export function refreshedRows(
  paths: readonly string[],
  base: Record<string, unknown>,
  done: string[],
  refreshing: Refreshing = refreshedAt
): readonly Row[] {
  const rows: Row[] = []
  for (const path of paths) {
    const row = refreshing(path, base)
    rows.push(row)
    if (row.outcome === "refreshed") done.push(`wrote ${path} again`)
  }
  return rows
}

export async function seatRefreshSettings(argv: readonly string[]): Promise<Answer> {
  const stray = argv.filter((one) => one !== JSON_FLAG)
  if (stray.length > 0) {
    const said = namesDrawn(stray)
    return refusedBy([`this takes \`${JSON_FLAG}\` and nothing else, and ${said} was said`])
  }
  const base = await readAgentSettingsBase()
  if (base.kind !== "loaded") {
    return refusedBy(
      [`${AGENT_SETTINGS_PATH} would not read, so there is nothing to write: ${base.reason}`],
      DATA
    )
  }
  let paths: readonly string[]
  try {
    paths = liveSettingsPaths()
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
  if (paths.length === 0) return refusedBy([NOTHING_LIVE], DATA)
  const done: string[] = []
  let rows: readonly Row[]
  try {
    rows = refreshedRows(paths, base.settings, done)
  } catch (thrown) {
    return { report: done, refusals: [whyOf(thrown), ...partWay(done)], code: OPERATIONAL }
  }
  if (argv.includes(JSON_FLAG)) return asJson({ rows })
  return told(rows.map((row) => `${row.path}\t${row.outcome}`))
}
