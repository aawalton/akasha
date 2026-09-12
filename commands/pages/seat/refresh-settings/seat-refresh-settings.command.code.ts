import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answering,
  asJson,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { seatRefreshSettings as page } from "akasha/commands/pages/seat/refresh-settings/seat-refresh-settings.command.ts"
import {
  AGENT_SETTINGS_PATH,
  readAgentSettingsBase,
  refreshedSettings,
} from "akasha/seat-system/supervising/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"

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

export async function seatRefreshSettings(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => {
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
    const rows = refreshedRows(paths, base.settings, done)
    if (read.taken.json) return asJson({ rows })
    return told(rows.map((row) => `${row.path}\t${row.outcome}`))
  })
}
