import type { SmsDiscardDiscardedAt } from "akasha/alan/harness/sms-access/sms-discards/properties/sms-discard-discarded-at.instant-property.types.ts"
import type { SmsDiscardReason } from "akasha/alan/harness/sms-access/sms-discards/properties/sms-discard-reason.text-property.types.ts"
import type { SmsDiscardSender } from "akasha/alan/harness/sms-access/sms-discards/properties/sms-discard-sender.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type SmsDiscard = Page & {
  sender: SmsDiscardSender
  reason: SmsDiscardReason
  discardedAt: SmsDiscardDiscardedAt
}
