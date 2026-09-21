import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillLineClass = {
  id: "01a05fca-cb87-7a9a-9dda-95916e9f73d7",
  type: "page-type/text-property",
  slug: "skill-line-class",
  propertySlug: "class",
  definition: "the class a skill line belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a class.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
