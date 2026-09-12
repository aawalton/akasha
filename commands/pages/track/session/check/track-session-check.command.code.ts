import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { trackSessionCheck as page } from "akasha/commands/pages/track/session/check/track-session-check.command.ts"
import {
  standingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import { faultsIn } from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [day]

export function trackSessionCheck(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const standing = standingFor(read.taken, given.root, new Date())
  if (typeof standing === "string") return mistaking([standing])
  const faults = faultsIn(standing.rows, standing.held)
  return faults.length === 0 ? telling("") : mistaking(faults)
}
