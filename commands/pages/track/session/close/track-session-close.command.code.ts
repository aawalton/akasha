import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { trackSessionClose as page } from "akasha/commands/pages/track/session/close/track-session-close.command.ts"
import {
  endingIn,
  landed,
  standingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  faultsIn,
  instantIn,
  sayingFor,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [dryRun, day, at]

export async function trackSessionClose(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const found = endingIn(given.root, standing.day, standing.held, standing.rows, false)
  if (typeof found === "string") return mistaking([found])
  const ended = instantIn(taken, taken.at, now)
  if (ended === null) return mistaking([sayingFor(taken, taken.at, at.said, now)])
  if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  found.stretch.endTime = ended
  const faults = faultsIn(found.rows, found.held)
  if (faults.length > 0) return mistaking(faults)
  if (standing.dryRun) return telling(shownOf(found.rows.slice(-2)))
  return await landed(found.held, found.rows, `Close on ${found.held.day}`, given)
}
