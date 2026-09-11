import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const selectValues = {
  id: "01a063de-2c60-7002-b5a6-6a0c7363e4f6",
  type: "text-property",
  slug: "select-values",
  propertySlug: "values",
  definition: "one value a select property admits",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The values are page data rather than TypeScript alone.",
    },
    {
      invariantKind: "departure",
      statement: "The order the values are written in is the order the values are offered in.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
