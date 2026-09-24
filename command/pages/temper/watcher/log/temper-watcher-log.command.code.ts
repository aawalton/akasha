import { readFileSync } from "node:fs"
import { join } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { jsonInOneObject } from "akasha/command/argument/pages/json-in-one-object.argument.ts"
import { limit as limitArgument } from "akasha/command/argument/pages/limit.argument.ts"
import { logDir as logDirArgument } from "akasha/command/argument/pages/log-dir.argument.ts"
import { since as sinceArgument } from "akasha/command/argument/pages/since.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperWatcherLog as page } from "akasha/command/pages/temper/watcher/log/temper-watcher-log.command.ts"
import type {
  LogSource,
  WatcherLogLine,
} from "akasha/temper/watcher/modules/watcher-log-line/watcher-log-line.module.code.ts"
import { parseWatcherLine } from "akasha/temper/watcher/modules/watcher-log-line/watcher-log-line.module.code.ts"
import { mergeNewestFirst } from "akasha/temper/watcher/modules/watcher-log-merging/watcher-log-merging.module.code.ts"
import { watcherLogDir } from "akasha/temper/watcher/modules/watcher-paths/watcher-paths.module.code.ts"
import { z } from "zod"

const NAMED = [limitArgument, sinceArgument, logDirArgument, jsonInOneObject]

const UNITS = { s: 1000, m: 60000, h: 3600000, d: 86400000 } as const

const DURATION = /^(\d+)([smhd])$/

const DURATION_SAID = z.tuple([z.string(), z.coerce.number().int(), z.enum(["s", "m", "h", "d"])])

function millisOf(said: string): number | null {
  const found = DURATION_SAID.safeParse(DURATION.exec(said)).data
  if (found === undefined) return null
  const [, count, unit] = found
  return count * UNITS[unit]
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

export function temperWatcherLog(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const sinceSaid = taken.since
  const sinceMillis = millisOf(sinceSaid)
  if (sinceMillis === null) {
    return refused(`\`${sinceSaid}\` is no duration — say a count and one of s, m, h or d`, INPUT)
  }
  const limit = taken.limit
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
  return told(capped.map((one) => JSON.stringify(one)))
}
