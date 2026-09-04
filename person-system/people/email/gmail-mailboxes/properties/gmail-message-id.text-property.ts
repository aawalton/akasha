import type { TextProperty } from "@akasha/pages-system/text-property"

export type GmailMessageId = string

export const gmailMessageId = {
  id: "01a06862-a0bc-705a-87c1-fbe2095fdae7",
  pageTypeSlug: "text-property",
  slug: "gmail-message-id",
  propertySlug: "message-id",
  definition: "the id Gmail gives a message",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The id is spelled as Gmail spells it rather than as a slug is spelled.",
    },
  ],
} as const satisfies TextProperty
