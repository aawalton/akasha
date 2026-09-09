import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import { JSON_SAID, shownOf } from "../../../../modules/session-rows/session-rows.module.code.ts"
import { standingFor, telling } from "../open/session-acting/session-acting.module.code.ts"

export function trackSessionShow(argv: readonly string[], given: Given): Answer {
  const standing = standingFor(argv, given.root, new Date())
  if (typeof standing === "string") return mistaking([standing])
  return telling(
    argv.includes(JSON_SAID) ? JSON.stringify(standing.rows, null, 2) : shownOf(standing.rows)
  )
}
