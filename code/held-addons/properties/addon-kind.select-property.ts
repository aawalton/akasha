import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const addonKind = {
  id: "01a0819d-3406-7d80-bea3-6be9825ecdca",
  type: "select-property",
  slug: "addon-kind",
  propertySlug: "addon-kind",
  definition: "where an addon's source came from",
  values: ["library", "native", "ported"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A native addon is backbone written for Temper.",
    },
    {
      invariantKind: "departure",
      statement: "A ported addon is a community addon a machine translated.",
    },
    {
      invariantKind: "departure",
      statement: "A library addon is a framework other addons load.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
