import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GmailMessageId = string

export const gmailMessageId = {
  id: "01a06862-a0bc-705a-87c1-fbe2095fdae7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "gmail-message-id",
  propertySlug: "message-id",
  definition: "the id Gmail gives a message",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The id is spelled as Gmail spells that id rather than as a slug is spelled.",
    },
  ],
} as const satisfies TextProperty
