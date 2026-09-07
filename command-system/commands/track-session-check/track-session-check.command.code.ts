import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { standingFor, telling } from "../track/session-acting/session-acting.module.code.ts"
import { faultsIn } from "../track/session-rows/session-rows.module.code.ts"

export function trackSessionCheck(argv: readonly string[], given: Given): Answer {
  const standing = standingFor(argv, given.root, new Date())
  if (typeof standing === "string") return mistaking([standing])
  const faults = faultsIn(standing.rows, standing.held.page)
  return faults.length === 0 ? telling("") : mistaking(faults)
}
