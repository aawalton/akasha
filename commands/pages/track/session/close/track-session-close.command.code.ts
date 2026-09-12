import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  endingIn,
  landed,
  standingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  AT,
  faultsIn,
  instantIn,
  sayingFor,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

export async function trackSessionClose(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
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
  if (standing.dryRun) return telling(shownOf(found.rows.slice(-2)))
  return await landed(found.held, found.rows, `Close on ${found.held.day}`, given)
}
