import type { List } from "../../page-types/page-properties/page-property.page-type.ts"
import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type SelectValues = List<string>

export const selectValues = {
  id: "01a063de-2c60-7002-b5a6-6a0c7363e4f6",
  pageTypeSlug: "text-property",
  slug: "select-values",
  propertySlug: "values",
  definition: "one value a select property admits",
  max: 100,
  nameFormatSlug: null,
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
} as const satisfies TextProperty
