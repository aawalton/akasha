import type { List } from "../../page-properties/page-property.page-type.ts"
import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type CountByKey = string
export type CountBy = List<CountByKey>

export const countBy = {
  id: "01a063ee-2a3b-7694-9520-31c706c31ee4",
  pageTypeSlug: "text-property",
  slug: "count-by",
  propertySlug: "count-by",
  definition: "the keys a query gathers its pages under to count them",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query counting by a key answers with a count for each value of that key.",
    },
  ],
} as const satisfies TextProperty
