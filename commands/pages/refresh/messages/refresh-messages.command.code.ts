import {
  mineMessages,
  saidOf,
} from "../../../../alan/track/daily/day-messages-mining/day-messages-mining.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"

const NOTHING_COUNTED =
  "no transcript on this machine holds a message Alan wrote a persona, so no day was counted. A " +
  "count Alan did not earn her would be a lie, and the counts already kept are left as they were."

export function refreshMessages(_argv: readonly string[], given: Given): Answer {
  const kept = mineMessages(given.root)
  if (kept.days === 0) {
    return { report: [], refusals: [NOTHING_COUNTED, ...kept.unfiled], code: 2 }
  }
  return { report: [saidOf(kept), ...kept.unfiled], refusals: [], code: 0 }
}
