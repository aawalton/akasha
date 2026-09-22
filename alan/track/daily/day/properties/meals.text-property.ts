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
      decisionKind: "decision-kind/departure",
      statement: "A meal named here is the picture taken of that meal.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Eleven of the thirteen pictures named here are ids no image page answers to.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to an image.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
