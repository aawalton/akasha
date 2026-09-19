import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const anchorLexeme = {
  id: "01a0685e-ef8a-7012-99bf-937f4b87f963",
  type: "page-type/text-property",
  slug: "anchor-lexeme",
  propertySlug: "lexeme",
  definition: "the words in the chapter that do the dating",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lexeme is the chapter's own words rather than a reading of those words.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
