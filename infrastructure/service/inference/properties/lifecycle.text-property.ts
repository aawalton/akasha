import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lifecycle = {
  id: "01a09095-243b-7ce0-9a35-68fd9e450733",
  type: "page-type/text-property",
  slug: "lifecycle",
  propertySlug: "lifecycle",
  definition: "how a service is held on its host",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service the pool swaps in and out says `pool`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that runs at all times says `always-on`.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The two ways a service is held are no pages.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a lifecycle.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
