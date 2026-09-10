import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EsoDay = string

export const esoDay = {
  id: "01a060fb-040d-7f7f-bce8-a74c90df15bc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "eso-day",
  propertySlug: "eso-day",
  definition: "the ESO day a record is of",
  maxLength: 10,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ESO day runs from six in the morning to six the next morning.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a day rather than text.",
    },
  ],
} as const satisfies TextProperty
