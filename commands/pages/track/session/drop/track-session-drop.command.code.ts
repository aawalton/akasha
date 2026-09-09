import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import {
  addressed,
  DRY_RUN,
  faultsIn,
  MEND,
  shownOf,
} from "../check/session-rows/session-rows.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../open/session-acting/session-acting.module.code.ts"

export async function trackSessionDrop(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = addressed(argv, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const at = standing.rows.indexOf(found)
  const before = at > 0 ? standing.rows[at - 1] : undefined
  standing.rows.splice(at, 1)
  if (argv.includes(MEND) && before !== undefined) {
    if (found.endTime === undefined) delete before.endTime
    else before.endTime = found.endTime
  }
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf(standing.rows))
  return await landed(standing.held, standing.rows, `Drop ${found.title} on ${standing.day}`, given)
}
