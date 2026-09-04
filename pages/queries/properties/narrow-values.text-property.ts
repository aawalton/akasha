import type { TextProperty } from "../../text-properties/text-property.page-type.ts"
import type { List } from "../../types/page-properties/page-property.page-type.ts"

export type NarrowValue = string
export type NarrowValues = List<NarrowValue>

export const narrowValues = {
  id: "01a063ee-2a3b-74ff-8037-ee9c7cf9f335",
  pageTypeSlug: "text-property",
  slug: "narrow-values",
  propertySlug: "values",
  definition: "what one narrow weighs a page's value against",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value naming a parameter is the value that parameter is given.",
    },
    {
      invariantKind: "departure",
      statement: "A blank character of a value is weighed like every other character.",
    },
    {
      invariantKind: "stopgap",
      statement: "A value is written as text whatever kind the key the value narrows holds.",
    },
  ],
} as const satisfies TextProperty
