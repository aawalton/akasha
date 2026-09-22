import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const valueSlug = {
  id: "01a0534e-c7e0-74c3-9eea-499d48af54db",
  type: "page-type/text-property",
  slug: "value-slug",
  propertySlug: "value",
  definition: "the value a persona represents",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The six values a persona represents are not pages.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a value.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
