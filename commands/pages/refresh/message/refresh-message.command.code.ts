import {
  mineMessages,
  saidOf,
} from "akasha/alan/track/daily/day-messages-mining/day-messages-mining.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING_COUNTED =
  "no transcript on this machine holds a message Alan wrote a persona, so no day was counted. A " +
  "count Alan did not earn her would be a lie, and the counts already kept are left as they were."

export async function refreshMessage(_argv: readonly string[], given: Given): Promise<Answer> {
  return await answering((done) => {
    const kept = mineMessages(given.root, done)
    if (kept.days === 0) {
      return refusedBy([NOTHING_COUNTED, ...kept.unfiled], DATA)
    }
    return told([saidOf(kept), ...kept.unfiled])
  })
}
