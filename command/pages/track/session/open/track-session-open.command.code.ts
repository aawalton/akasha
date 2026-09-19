import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"

import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  openIn,
  type Row,
  sayingFor,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
import {
  taggedFor,
  taggingOf,
} from "akasha/command/pages/track/session/modules/session-relationships/session-relationships.module.code.ts"
import { trackSessionOpen as page } from "akasha/command/pages/track/session/open/track-session-open.command.ts"

const NAMED = [day, safety, difficulty, title, at, relationship]

export async function trackSessionOpen(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  if (openIn(standing.rows) !== null) {
    return mistaking(["this day carries an open stretch already, so nothing opens here"])
  }
  const called = taken.title
  const began = instantIn(taken, taken.at, now)
  if (began === null) return mistaking([sayingFor(taken, taken.at, at.said, now)])
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
  standing.rows.push(one)
  standing.rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  return await landed(standing.held, standing.rows, `Open ${called} on ${standing.day}`, given)
}
