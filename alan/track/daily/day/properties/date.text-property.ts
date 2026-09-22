import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const date = {
  id: "01a05fd8-c30e-7ae3-b3f5-528afcf00bbe",
  type: "page-type/text-property",
  slug: "date",
  propertySlug: "date",
  definition: "a record's day",
  maxLength: 10,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a day rather than text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
