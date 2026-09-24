import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { GmailDecision } from "akasha/person/email/gmail-mailbox/properties/processed-messages/properties/gmail-decision.text-property.types.ts"
import type { GmailMessageId } from "akasha/person/email/gmail-mailbox/properties/processed-messages/properties/gmail-message-id.text-property.types.ts"
import type { GmailProcessedAt } from "akasha/person/email/gmail-mailbox/properties/processed-messages/properties/gmail-processed-at.instant-property.types.ts"

export type ProcessedMessages = "jsonl"

export type ProcessedMessagesRow = {
  id: Id
  slug: Slug
  decision: GmailDecision
  messageId: GmailMessageId
  processedAt: GmailProcessedAt
}
