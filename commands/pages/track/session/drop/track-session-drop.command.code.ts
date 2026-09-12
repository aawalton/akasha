import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { id } from "akasha/commands/arguments/pages/id.argument.ts"
import { last } from "akasha/commands/arguments/pages/last.argument.ts"
import { mend } from "akasha/commands/arguments/pages/mend.argument.ts"
import { open } from "akasha/commands/arguments/pages/open.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { trackSessionDrop as page } from "akasha/commands/pages/track/session/drop/track-session-drop.command.ts"
import {
  landed,
  standingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  addressed,
  faultsIn,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [dryRun, day, at, id, open, last, mend]

export async function trackSessionDrop(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const found = addressed(taken, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const place = standing.rows.indexOf(found)
  const before = place > 0 ? standing.rows[place - 1] : undefined
  standing.rows.splice(place, 1)
  if (standing.mend && before !== undefined) {
    if (found.endTime === undefined) delete before.endTime
    else before.endTime = found.endTime
  }
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (standing.dryRun) return telling(shownOf(standing.rows))
  return await landed(standing.held, standing.rows, `Drop ${found.title} on ${standing.day}`, given)
}
