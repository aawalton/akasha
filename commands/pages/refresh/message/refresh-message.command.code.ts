import {
  type Kept,
  mineMessages,
  saidOf,
} from "akasha/alan/track/daily/day-messages-mining/day-messages-mining.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  partWay,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"

const NOTHING_COUNTED =
  "no transcript on this machine holds a message Alan wrote a persona, so no day was counted. A " +
  "count Alan did not earn her would be a lie, and the counts already kept are left as they were."

export function refreshMessage(_argv: readonly string[], given: Given): Answer {
  const done: string[] = []
  let kept: Kept
  try {
    kept = mineMessages(given.root, done)
  } catch (thrown) {
    return { report: done, refusals: [whyOf(thrown), ...partWay(done)], code: OPERATIONAL }
  }
  if (kept.days === 0) {
    return refusedBy([NOTHING_COUNTED, ...kept.unfiled], DATA)
  }
  return told([saidOf(kept), ...kept.unfiled])
}
