import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const scriptureBook = {
  id: "01a0658d-fe50-7003-842b-538187e1ae93",
  type: "text-property",
  slug: "scripture-book",
  propertySlug: "book",
  definition: "the book of scripture a passage is in",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book is written as the book is printed rather than as a slug is written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
