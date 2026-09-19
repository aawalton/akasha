import { readMountainWallTime } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"

import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { stretchEnd } from "akasha/command/argument/pages/stretch-end.argument.ts"
import { stretchStart } from "akasha/command/argument/pages/stretch-start.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  anchoredIn,
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  type Row,
  sayingFor,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { trackSessionLog as page } from "akasha/command/pages/track/session/log/track-session-log.command.ts"
import {
  landed,
  standingFor,
  taggingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
import {
  taggedFor,
  taggingOf,
} from "akasha/command/pages/track/session/modules/session-relationships/session-relationships.module.code.ts"

const NAMED = [day, safety, difficulty, title, stretchStart, stretchEnd, relationship]

export async function trackSessionLog(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const called = taken.title
  const began = instantIn(taken, taken.stretchStart, now)
  if (began === null) {
    return mistaking([sayingFor(taken, taken.stretchStart, stretchStart.said, now)])
  }
  const before = standing.rows[standing.rows.length - 1] ?? null
  const levels = levelsFor(taken, called, before, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const one: Row = {
    id: mintedAt(now),
    title: called,
    startTime: began,
    dailyTracking: standing.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, called, [], tagging.known)),
  }
  const reading = readMountainWallTime(anchoredIn(taken, taken.stretchEnd), now)
  if (reading.read === "refused") return mistaking([reading.saying])
  if (reading.at.getTime() <= new Date(began).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  one.endTime = reading.iso
  standing.rows.push(one)
  standing.rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  return await landed(standing.held, standing.rows, `Log ${called} on ${standing.day}`, given)
}
