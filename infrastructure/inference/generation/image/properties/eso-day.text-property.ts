import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoDay = {
  id: "01a060fb-040d-7f7f-bce8-a74c90df15bc",
  type: "page-type/text-property",
  slug: "eso-day",
  propertySlug: "eso-day",
  definition: "a record's ESO day",
  maxLength: 10,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ESO day runs from six in the morning to six the next morning.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a day rather than text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
