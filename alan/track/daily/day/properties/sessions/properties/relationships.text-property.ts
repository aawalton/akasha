import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const relationships = {
  id: "01a05fd8-c30f-754a-bb2e-de6ec74d6e4a",
  type: "page-type/text-property",
  slug: "relationships",
  propertySlug: "relationships",
  definition: "the people sharing a stretch of time",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a person.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
