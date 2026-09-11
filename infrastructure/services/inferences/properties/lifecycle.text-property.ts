import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const lifecycle = {
  id: "01a09095-243b-7ce0-9a35-68fd9e450733",
  type: "text-property",
  slug: "lifecycle",
  propertySlug: "lifecycle",
  definition: "how a service is held on its host",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service the pool swaps in and out says `pool`.",
    },
    {
      invariantKind: "departure",
      statement: "A service that runs at all times says `always-on`.",
    },
    {
      invariantKind: "stopgap",
      statement: "The two ways a service is held are no pages.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a lifecycle.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
