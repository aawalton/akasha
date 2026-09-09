import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../../../../modules/session-acting/session-acting.module.code.ts"
import {
  addressed,
  carriedIn,
  DIFFICULTY,
  DRY_RUN,
  faultsIn,
  levelsFor,
  saidFor,
  shownOf,
  TITLE,
  taggedFor,
} from "../../../../modules/session-rows/session-rows.module.code.ts"

export async function trackSessionAmend(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = addressed(argv, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const title = saidFor(argv, TITLE) ?? found.title
  const levels = levelsFor(argv, title, found, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const kept = typeof found.difficultyLevel === "string" ? found.difficultyLevel : undefined
  const changing: { safetyLevel?: string; difficultyLevel?: string } = { ...levels.levels }
  if (saidFor(argv, DIFFICULTY) === null) changing.difficultyLevel = kept
  const carried = carriedIn(found)
  const tags =
    tagging.stated === null && saidFor(argv, TITLE) === null
      ? carried
      : taggedFor(tagging.stated, title, carried, tagging.known)
  Object.assign(found, changing, { title })
  if (tags.length === 0) delete found.relationships
  else found.relationships = tags
  if (changing.difficultyLevel === undefined) delete found.difficultyLevel
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf([found]))
  return await landed(standing.held, standing.rows, `Amend ${title} on ${standing.day}`, given)
}
