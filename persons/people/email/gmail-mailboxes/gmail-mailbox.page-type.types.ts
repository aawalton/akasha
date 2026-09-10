import type { Page } from "../../../../pages/page.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { EmailAddress } from "../../../../personas/properties/email-address.email-address-property.ts"
import type { ProcessedMessages } from "./properties/processed-messages.page-property-entry.ts"

export type GmailMailbox = Page & {
  title: Title
  email: EmailAddress
  processedMessages?: ProcessedMessages
}
