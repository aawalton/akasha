import {
  mineMessages,
  saidOf,
} from "akasha/alan/track/daily/day-messages-mining/day-messages-mining.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING_COUNTED =
  "no transcript on this machine holds a message Alan wrote a persona, so no day was counted. A " +
  "count Alan did not earn her would be a lie, and the counts already kept are left as they were."

export function refreshMessage(_argv: readonly string[], given: Given): Answer {
  const kept = mineMessages(given.root)
  if (kept.days === 0) {
    return refusedBy([NOTHING_COUNTED, ...kept.unfiled], DATA)
  }
  return told([saidOf(kept), ...kept.unfiled])
}
