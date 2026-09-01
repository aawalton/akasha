import type { RecordResult } from "@alanwalton/sms-core/handle-inbound"
import type { DiscardedInbound } from "@alanwalton/sms-core/normalize"
import { writePage } from "@shared/pages-query"

export const SMS_DISCARD_PAGE_TYPE_SLUG = "sms-discard"
export const WRITER = "sms-webhook"

export function discardNamed(discardedAt: string): string {
  return discardedAt.replace(/[:.]/g, "-")
}

export async function recordSmsDiscard(
  discard: DiscardedInbound,
  discardedAt: string = new Date().toISOString()
): Promise<RecordResult> {
  const landed = await writePage(
    SMS_DISCARD_PAGE_TYPE_SLUG,
    discardNamed(discardedAt),
    {
      title: `SMS discarded — ${discard.sender}`,
      sender: discard.sender,
      reason: discard.reason,
      "discarded-at": discardedAt,
    },
    WRITER
  )
  return landed.ok ? { kind: "recorded" } : { kind: "not-recorded", reason: landed.why }
}
