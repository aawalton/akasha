import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ProcessedMessages } from "akasha/person/email/gmail-mailbox/properties/processed-messages.page-property-entry.types.ts"
import type { EmailAddress } from "akasha/persona/properties/email-address.email-address-property.types.ts"

export type GmailMailbox = Page & {
  title: Title
  email: EmailAddress
  processedMessages?: ProcessedMessages
}
