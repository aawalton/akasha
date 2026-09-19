import { readFileSync } from "node:fs"
import { readMountainWallTime } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"

import { fromFile } from "akasha/command/argument/pages/from-file.argument.ts"
import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  difficultyForTitle,
  readDifficulty,
  readSafety,
} from "akasha/command/pages/track/modules/session-leveling/session-leveling.module.code.ts"
import {
  anchoredIn,
  faultsIn,
  mintedAt,
  type Row,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { trackSessionFile as page } from "akasha/command/pages/track/session/file/track-session-file.command.ts"
import {
  landed,
  standingFor,
  taggingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
import {
  taggedFor,
  taggingOf,
} from "akasha/command/pages/track/session/modules/session-relationships/session-relationships.module.code.ts"

const LINE = /^(\S+)\s+(.+?)(?:\s+s(-?[\d.]+)d([\d.]+))?$/

const NAMED = [day, fromFile, relationship]

export async function trackSessionFile(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const from = taken.fromFile
  let said: string
  try {
    said = readFileSync(from === "-" ? "/dev/stdin" : from, "utf8")
  } catch {
    return mistaking([`the lines for ${standing.day} would not open from ${from}`])
  }
  const lines = said.split("\n").filter((one) => one.trim() !== "")
  if (lines.length === 0) return mistaking(["the lines handed in carry no stretch"])
  const made: Row[] = []
  const refusals: string[] = []
  for (const [at, line] of lines.entries()) {
    const named = `line ${String(at + 1)}`
    const found = LINE.exec(line.trim())
    if (found === null) {
      refusals.push(`${named} opens with no wall time and a title`)
      continue
    }
    const reading = readMountainWallTime(anchoredIn(taken, found[1] ?? ""), now)
    if (reading.read === "refused") {
      refusals.push(`${named}: ${reading.saying}`)
      continue
    }
    const title = (found[2] ?? "").trim()
    const one: Row = {
      id: mintedAt(now),
      title,
      startTime: reading.iso,
      dailyTracking: standing.held.page,
      ...taggingOf(taggedFor(tagging.stated, title, [], tagging.known)),
    }
    const safety = found[3]
    if (safety === undefined) {
      const before = made[made.length - 1]
      const carried = before?.safetyLevel
      if (typeof carried === "string") one.safetyLevel = carried
    } else {
      const level = readSafety(safety)
      if (level.read === "refused") refusals.push(`${named}: ${level.saying}`)
      else one.safetyLevel = level.level
    }
    const difficulty = found[4]
    if (difficulty === undefined) {
      const inferred = difficultyForTitle(title, standing.activities)
      if (inferred !== null) one.difficultyLevel = inferred
    } else {
      const level = readDifficulty(difficulty)
      if (level.read === "refused") refusals.push(`${named}: ${level.saying}`)
      else one.difficultyLevel = level.level
    }
    made.push(one)
  }
  for (let at = 1; at < made.length; at += 1) {
    const before = made[at - 1]
    const one = made[at]
    if (before === undefined || one === undefined) continue
    if (new Date(one.startTime).getTime() <= new Date(before.startTime).getTime()) {
      refusals.push(`line ${String(at + 1)} begins at or before the line above it`)
      continue
    }
    before.endTime = one.startTime
  }
  const faults = [...refusals, ...faultsIn(made, standing.held)]
  if (faults.length > 0) return mistaking(faults)
  return await landed(
    standing.held,
    made,
    `File ${String(made.length)} stretches on ${standing.day}`,
    given
  )
}
