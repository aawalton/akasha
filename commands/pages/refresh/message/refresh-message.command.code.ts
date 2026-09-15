import {
  mineMessages,
  saidOf,
} from "akasha/alan/track/daily/modules/day-messages-mining/day-messages-mining.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { refreshMessage as page } from "akasha/command/pages/refresh/message/refresh-message.command.ts"

const NOTHING_COUNTED =
  "no transcript on this machine holds a message Alan wrote a persona, so no day was counted. A " +
  "count Alan did not earn her would be a lie, and the counts already kept are left as they were."

export async function refreshMessage(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  return await answering((done) => {
    const kept = mineMessages(given.root, done)
    if (kept.days === 0) {
      return refusedBy([NOTHING_COUNTED, ...kept.unfiled], DATA)
    }
    return told([saidOf(kept), ...kept.unfiled])
  })
}
