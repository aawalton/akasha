import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AnchorLexeme = string

export const anchorLexeme = {
  id: "01a0685e-ef8a-7012-99bf-937f4b87f963",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "anchor-lexeme",
  propertySlug: "lexeme",
  definition: "the words in the chapter that do the dating",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lexeme is the chapter's own words rather than a reading of those words.",
    },
  ],
} as const satisfies TextProperty
