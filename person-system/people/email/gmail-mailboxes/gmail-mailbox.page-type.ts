import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { EmailAddress } from "@akasha/persona-system/email-address"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { ProcessedMessages } from "./properties/processed-messages.page-property-entry.ts"

export type GmailMailbox = Page & {
  title: Title
  emailAddress: EmailAddress
  processedMessages?: ProcessedMessages
}

export const gmailMailbox = {
  id: "01a06828-59d3-7295-868d-d695a5d5efd8",
  pageTypeSlug: "page-type",
  slug: "gmail-mailbox",
  definition: "one Gmail account the system reads mail from",
  pluralSlug: "gmail-mailboxes",
  extendsSlug: "page-type/page",
  partSlugs: ["email-address-property/email-address", "page-property-entry/processed-messages"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "email-address", required: true, many: false },
    { pagePropertySlug: "processed-messages", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mailbox is named for the account rather than for the address.",
    },
    {
      invariantKind: "departure",
      statement: "Every message a mailbox has been through stands beside that mailbox.",
    },
    {
      invariantKind: "gap",
      statement:
        "The address stands under the address a person sends and receives at rather than under a key of its own.",
    },
  ],
} as const satisfies PageType
