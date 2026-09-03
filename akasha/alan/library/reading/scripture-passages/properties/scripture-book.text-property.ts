import type { TextProperty } from "@akasha/pages-system/text-property"

export type ScriptureBook = string

export const scriptureBook = {
  id: "01a0658d-fe50-7003-842b-538187e1ae93",
  pageTypeSlug: "text-property",
  slug: "scripture-book",
  propertySlug: "book",
  definition: "the book of scripture a passage stands in",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book is written as the book is printed rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty
