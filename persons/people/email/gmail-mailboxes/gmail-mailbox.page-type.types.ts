import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { EmailAddress } from "akasha/personas/properties/email-address.email-address-property.types.ts"
import type { ProcessedMessages } from "akasha/persons/people/email/gmail-mailboxes/properties/processed-messages.page-property-entry.types.ts"

export type GmailMailbox = Page & {
  title: Title
  email: EmailAddress
  processedMessages?: ProcessedMessages
}
