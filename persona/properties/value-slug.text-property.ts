import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const valueSlug = {
  id: "01a0534e-c7e0-74c3-9eea-499d48af54db",
  type: "text-property",
  slug: "value-slug",
  propertySlug: "value-slug",
  definition: "the value a persona represents",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The six values a persona represents are not pages.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This property is a relation to a value.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
