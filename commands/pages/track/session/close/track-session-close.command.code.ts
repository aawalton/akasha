import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import {
  endingIn,
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../../../../modules/session-acting/session-acting.module.code.ts"
import {
  AT,
  DRY_RUN,
  faultsIn,
  instantIn,
  sayingFor,
  shownOf,
} from "../../../../modules/session-rows/session-rows.module.code.ts"

export async function trackSessionClose(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = endingIn(given.root, standing.day, standing.held, standing.rows, false)
  if (typeof found === "string") return mistaking([found])
  const ended = instantIn(argv, AT, now)
  if (ended === null) return mistaking([sayingFor(argv, AT, now)])
  if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  found.stretch.endTime = ended
  const faults = faultsIn(found.rows, found.held)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf(found.rows.slice(-2)))
  return await landed(found.held, found.rows, `Close on ${found.held.day}`, given)
}
