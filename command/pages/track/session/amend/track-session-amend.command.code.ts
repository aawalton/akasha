import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"

import { id } from "akasha/command/argument/pages/id.argument.ts"
import { last } from "akasha/command/argument/pages/last.argument.ts"
import { open } from "akasha/command/argument/pages/open.argument.ts"
import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  addressed,
  faultsIn,
  levelsFor,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { trackSessionAmend as page } from "akasha/command/pages/track/session/amend/track-session-amend.command.ts"
import {
  landed,
  standingFor,
  taggingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
import {
  carriedIn,
  taggedFor,
} from "akasha/command/pages/track/session/modules/session-relationships/session-relationships.module.code.ts"

const NAMED = [day, at, id, open, last, title, safety, difficulty, relationship]

export async function trackSessionAmend(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = addressed(taken, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const called = taken.title ?? found.title
  const levels = levelsFor(taken, called, found, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const kept = typeof found.difficultyLevel === "string" ? found.difficultyLevel : undefined
  const changing: { safetyLevel?: string; difficultyLevel?: string } = { ...levels.levels }
  if (taken.difficulty === undefined) changing.difficultyLevel = kept
  const carried = carriedIn(found)
  const tags =
    tagging.stated === null && taken.title === undefined
      ? carried
      : taggedFor(tagging.stated, called, carried, tagging.known)
  Object.assign(found, changing, { title: called })
  if (tags.length === 0) delete found.relationships
  else found.relationships = tags
  if (changing.difficultyLevel === undefined) delete found.difficultyLevel
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  return await landed(standing.held, standing.rows, `Amend ${called} on ${standing.day}`, given)
}
