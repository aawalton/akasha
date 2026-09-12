import { readFileSync } from "node:fs"
import { join } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { jsonInOneObject } from "akasha/commands/arguments/pages/json-in-one-object.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import { logDir as logDirArgument } from "akasha/commands/arguments/pages/log-dir.argument.ts"
import { since as sinceArgument } from "akasha/commands/arguments/pages/since.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  OK,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperWatcherLogList as page } from "akasha/commands/pages/temper/watcher/log-list/temper-watcher-log-list.command.ts"
import type {
  LogSource,
  WatcherLogLine,
} from "akasha/temper/watcher/watcher-log-line/watcher-log-line.module.code.ts"
import { parseWatcherLine } from "akasha/temper/watcher/watcher-log-line/watcher-log-line.module.code.ts"
import { mergeNewestFirst } from "akasha/temper/watcher/watcher-log-merging/watcher-log-merging.module.code.ts"
import { watcherLogDir } from "akasha/temper/watcher/watcher-paths/watcher-paths.module.code.ts"

const NAMED = [limitArgument, sinceArgument, logDirArgument, jsonInOneObject]

const SINCE_BY_DEFAULT = "1h"

const LIMIT_BY_DEFAULT = 500

const UNITS: Readonly<Record<string, number>> = { s: 1000, m: 60000, h: 3600000, d: 86400000 }

const DURATION = /^(\d+)([smhd])$/

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

export function temperWatcherLogList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const sinceSaid = taken.since ?? SINCE_BY_DEFAULT
  const sinceMillis = millisOf(sinceSaid)
  if (sinceMillis === null) {
    return refused(`\`${sinceSaid}\` is no duration — say a count and one of s, m, h or d`, INPUT)
  }
  const limit = taken.limit ?? LIMIT_BY_DEFAULT
  if (limit === 0) {
    return refused(
      `\`${limitArgument.said} 0\` reads no records — say a whole number above zero`,
      INPUT
    )
  }

  const dir = taken.logDir ?? watcherLogDir()
  const workerPath = join(dir, "watcher.log")
  const trayPath = join(dir, "tray.log")
  const fromWorker = linesIn(workerPath, "watcher")
  const fromTray = linesIn(trayPath, "tray")
  if (fromWorker === null && fromTray === null) {
    return refused(`neither ${workerPath} nor ${trayPath} could be read`, DATA)
  }

  const merged = mergeNewestFirst(fromWorker ?? [], fromTray ?? [], Date.now() - sinceMillis)
  const capped = merged.slice(0, limit)

  if (taken.jsonInOneObject) {
    return asJson({ lines: capped, count: capped.length })
  }
  return { report: capped.map((one) => JSON.stringify(one)), refusals: [], code: OK }
}
