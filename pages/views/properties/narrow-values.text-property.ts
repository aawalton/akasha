import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const narrowValues = {
  id: "01a063ee-2a3b-74ff-8037-ee9c7cf9f335",
  type: "text-property",
  slug: "narrow-values",
  propertySlug: "values",
  definition: "what one narrow weighs a page's value against",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A blank character of a value is weighed like every other character.",
    },
    {
      invariantKind: "stopgap",
      statement: "A value is written as text whatever kind the key the value narrows has.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
