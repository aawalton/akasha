import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const meals = {
  id: "01a05fd8-c30f-7952-9ba0-4a131ba3347a",
  type: "page-type/text-property",
  slug: "meals",
  propertySlug: "meals",
  definition: "every meal recorded against a day",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Every meal named here is an id that names no page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a meal.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
