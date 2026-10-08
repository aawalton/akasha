import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const narrowValues = {
  id: "01a063ee-2a3b-74ff-8037-ee9c7cf9f335",
  type: "page-type/text-property",
  slug: "narrow-values",
  propertySlug: "values",
  definition: "the text against which a narrow weighs a page's value",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank character of a value is weighed like every other character.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A value is written as text whatever kind the key the value narrows has.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T21:02:27.899Z",
  updatedAt: "2026-09-22T14:08:59.000Z",
} as const satisfies TextProperty
