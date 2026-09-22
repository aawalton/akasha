import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const jewelryTypeId = {
  id: "01a05fd1-d43c-7d49-81c6-a1c0aa409075",
  type: "page-type/text-property",
  slug: "jewelry-type-id",
  propertySlug: "jewelry-type",
  definition: "the kind of jewelry a slot takes",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a jewelry type.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
