import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  dayNow,
  heldFor,
  shownOf,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { trackSessionList as page } from "akasha/command/pages/track/session/list/track-session-list.command.ts"
import { telling } from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"

const NAMED = [json, day]

export function trackSessionList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const held = heldFor(given.root, taken.day ?? dayNow(new Date()))
  if (typeof held === "string") return mistaking([held])
  return telling(taken.json ? JSON.stringify(held.rows, null, 2) : shownOf(held.rows))
}
