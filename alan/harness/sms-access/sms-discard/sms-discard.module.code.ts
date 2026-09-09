import type { RecordResult } from "akasha/alan/harness/sms-core/handle-inbound/handle-inbound.module.code.ts"
import type { DiscardedInbound } from "akasha/alan/harness/sms-core/normalize/normalize.module.code.ts"

export const SMS_DISCARD_PAGE_TYPE_SLUG = "sms-discard"

const NOTHING_LANDS = [
  `a turned-away SMS is written nowhere: the \`${SMS_DISCARD_PAGE_TYPE_SLUG}\` pages sit in the`,
  "old page store rather than in akasha, and the pages system service answers for akasha alone.",
].join(" ")

export function discardNamed(discardedAt: string): string {
  return discardedAt.replace(/[:.]/g, "-")
}

export function discardLost(discard: DiscardedInbound, discardedAt: string): string {
  return [
    NOTHING_LANDS,
    `the message turned away at ${discardedAt} from ${discard.sender}`,
    `for \`${discard.reason}\` is lost.`,
  ].join(" ")
}

export function recordSmsDiscard(
  discard: DiscardedInbound,
  discardedAt: string = new Date().toISOString()
): Promise<RecordResult> {
  const reason = discardLost(discard, discardedAt)
  console.error(`sms-discard: ${reason}`)
  return Promise.resolve({ kind: "not-recorded", reason })
}
