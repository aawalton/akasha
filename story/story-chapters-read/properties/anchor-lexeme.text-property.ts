import type { TextProperty } from "@akasha/pages-system/text-property"

export type AnchorLexeme = string

export const anchorLexeme = {
  id: "01a0685e-ef8a-7012-99bf-937f4b87f963",
  pageTypeSlug: "text-property",
  slug: "anchor-lexeme",
  propertySlug: "lexeme",
  definition: "the words in the chapter that do the dating",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lexeme is the chapter's own words rather than a reading of those words.",
    },
  ],
} as const satisfies TextProperty
