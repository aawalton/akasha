import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const scriptureBook = {
  id: "01a0658d-fe50-7003-842b-538187e1ae93",
  type: "page-type/text-property",
  slug: "scripture-book",
  propertySlug: "book",
  definition: "a passage's book of scripture",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book is written as the book is printed rather than as a slug is written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
