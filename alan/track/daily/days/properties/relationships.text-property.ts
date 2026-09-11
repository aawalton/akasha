import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const relationships = {
  id: "01a05fd8-c30f-754a-bb2e-de6ec74d6e4a",
  type: "text-property",
  slug: "relationships",
  propertySlug: "relationships",
  definition: "the people a stretch of time was spent with",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a person.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
