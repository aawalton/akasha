import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { LogSource, WatcherLogLine } from "@akasha/temper-watcher/watcher-log-line"
import { parseWatcherLine } from "@akasha/temper-watcher/watcher-log-line"
import { mergeNewestFirst } from "@akasha/temper-watcher/watcher-log-merging"
import { watcherLogDir } from "@akasha/temper-watcher/watcher-paths"

const INPUT = 1
const DATA = 2
const SINCE = "--since"
const LIMIT = "--limit"
const LOG_DIR = "--log-dir"
const JSON_SAID = "--json"
const VALUED: readonly string[] = [SINCE, LIMIT, LOG_DIR]

const UNITS: Readonly<Record<string, number>> = { s: 1000, m: 60000, h: 3600000, d: 86400000 }

const DURATION = /^(\d+)([smhd])$/

type Told = { readonly named: Record<string, string>; readonly flags: readonly string[] }

function told(argv: readonly string[]): Told | string {
  const named: Record<string, string> = {}
  const flags: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] as string
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      if (value === undefined) return `\`${one}\` was said with nothing after it`
      named[one] = value
      at += 1
      continue
    }
    if (one === JSON_SAID) {
      flags.push(one)
      continue
    }
    return `\`${one}\` is nothing \`akasha temper-watcher-logs\` takes`
  }
  return { named, flags }
}

function millisOf(said: string): number | null {
  const found = DURATION.exec(said)
  if (found === null) return null
  const count = Number.parseInt(found[1] as string, 10)
  const unit = UNITS[found[2] as string]
  return unit === undefined ? null : count * unit
}

function linesIn(path: string, source: LogSource): readonly WatcherLogLine[] | null {
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return null
  }
  const read: WatcherLogLine[] = []
  for (const line of raw.split("\n")) {
    if (line.trim() === "") continue
    const one = parseWatcherLine(line, source)
    if (one !== null) read.push(one)
  }
  return read
}

export function temperWatcherLogs(argv: readonly string[]): Answer {
  const read = told(argv)
  if (typeof read === "string") return refused(read, INPUT)

  const sinceSaid = read.named[SINCE] ?? "1h"
  const sinceMillis = millisOf(sinceSaid)
  if (sinceMillis === null) {
    return refused(`\`${sinceSaid}\` is no duration — say a count and one of s, m, h or d`, INPUT)
  }
  const limitSaid = read.named[LIMIT] ?? "500"
  const limit = Number.parseInt(limitSaid, 10)
  if (!Number.isInteger(limit) || limit <= 0 || String(limit) !== limitSaid) {
    return refused(`\`${limitSaid}\` is no count of records — say a whole number above zero`, INPUT)
  }

  const dir = read.named[LOG_DIR] ?? watcherLogDir()
  const workerPath = join(dir, "watcher.log")
  const trayPath = join(dir, "tray.log")
  const fromWorker = linesIn(workerPath, "watcher")
  const fromTray = linesIn(trayPath, "tray")
  if (fromWorker === null && fromTray === null) {
    return refused(`neither ${workerPath} nor ${trayPath} could be read`, DATA)
  }

  const merged = mergeNewestFirst(fromWorker ?? [], fromTray ?? [], Date.now() - sinceMillis)
  const capped = merged.slice(0, limit)

  if (read.flags.includes(JSON_SAID)) {
    return {
      report: [JSON.stringify({ lines: capped, count: capped.length })],
      refusals: [],
      code: 0,
    }
  }
  return { report: capped.map((one) => JSON.stringify(one)), refusals: [], code: 0 }
}
