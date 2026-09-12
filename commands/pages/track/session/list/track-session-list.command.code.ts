import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { trackSessionList as page } from "akasha/commands/pages/track/session/list/track-session-list.command.ts"
import { telling } from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  dayNow,
  heldFor,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [json, day]

export function trackSessionList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const held = heldFor(given.root, taken.day ?? dayNow(new Date()))
  if (typeof held === "string") return mistaking([held])
  return telling(taken.json ? JSON.stringify(held.rows, null, 2) : shownOf(held.rows))
}
