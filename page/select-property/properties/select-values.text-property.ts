import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const selectValues = {
  id: "01a063de-2c60-7002-b5a6-6a0c7363e4f6",
  type: "page-type/text-property",
  slug: "select-values",
  propertySlug: "values",
  definition: "a value a select property admits",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The values are page data rather than TypeScript alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order the values are written in is the order the values are offered in.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
