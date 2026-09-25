import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const wireKeyName = {
  id: "01a0d965-17dc-79ec-95f5-b109ab93b31d",
  type: "page-type/text-property",
  slug: "wire-key-name",
  propertySlug: "wire-key-name",
  definition: "the name each reading in a group carries its wire key under",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every group drawn as stoplights states the name its wire keys travel under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group stating no name has no reading drawn as a stoplight.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
