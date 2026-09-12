import { readMountainWallTime } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { difficulty } from "akasha/commands/arguments/pages/difficulty.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { safety } from "akasha/commands/arguments/pages/safety.argument.ts"
import { stretchEnd } from "akasha/commands/arguments/pages/stretch-end.argument.ts"
import { stretchStart } from "akasha/commands/arguments/pages/stretch-start.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { trackSessionLog as page } from "akasha/commands/pages/track/session/log/track-session-log.command.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  taggedFor,
  taggingOf,
} from "akasha/commands/pages/track/session/session-relationships/session-relationships.module.code.ts"
import {
  anchoredIn,
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  type Row,
  sayingFor,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [dryRun, day, safety, difficulty, title, stretchStart, stretchEnd, relationship]

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
  if (standing.dryRun) return telling(shownOf([one]))
  return await landed(standing.held, standing.rows, `Log ${called} on ${standing.day}`, given)
}
