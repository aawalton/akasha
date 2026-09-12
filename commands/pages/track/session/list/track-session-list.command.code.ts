import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  standingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  JSON_SAID,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

export function trackSessionList(argv: readonly string[], given: Given): Answer {
  const standing = standingFor(argv, given.root, new Date())
  if (typeof standing === "string") return mistaking([standing])
  return telling(
    argv.includes(JSON_SAID) ? JSON.stringify(standing.rows, null, 2) : shownOf(standing.rows)
  )
}
