import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const gmailMailbox = {
  id: "01a06828-59d3-7295-868d-d695a5d5efd8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "gmail-mailbox",
  definition: "one Gmail account the system reads mail from",
  pluralSlug: "gmail-mailboxes",
  extends: ["page-type/page"],
  parts: ["page-property-entry/processed-messages"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "email-address-property/email-address", required: true, many: false },
    { pageProperty: "page-property-entry/processed-messages", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mailbox is named for the account rather than for the address.",
    },
    {
      invariantKind: "departure",
      statement: "Every message a mailbox has been through sits beside that mailbox.",
    },
    {
      invariantKind: "gap",
      statement:
        "The address sits under the address a person sends and receives at rather than a key of its own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
