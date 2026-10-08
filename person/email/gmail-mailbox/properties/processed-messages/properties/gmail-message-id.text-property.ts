import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const gmailMessageId = {
  id: "01a06862-a0bc-705a-87c1-fbe2095fdae7",
  type: "page-type/text-property",
  slug: "gmail-message-id",
  propertySlug: "message-id",
  definition: "the id Gmail gives a message",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The id is spelled as Gmail spells that id rather than as a slug is spelled.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:48:09.276Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
