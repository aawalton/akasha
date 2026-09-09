import type { Page } from "../../../../pages/page.page-type.ts"
import type { SmsDiscardDiscardedAt } from "./properties/sms-discard-discarded-at.instant-property.ts"
import type { SmsDiscardReason } from "./properties/sms-discard-reason.text-property.ts"
import type { SmsDiscardSender } from "./properties/sms-discard-sender.text-property.ts"

export type SmsDiscard = Page & {
  sender: SmsDiscardSender
  reason: SmsDiscardReason
  discardedAt: SmsDiscardDiscardedAt
}
