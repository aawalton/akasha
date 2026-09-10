import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AddonKind = "library" | "native" | "ported"

export const addonKind = {
  id: "01a0819d-3406-7d80-bea3-6be9825ecdca",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "addon-kind",
  propertySlug: "addon-kind",
  definition: "where an addon's source came from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
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
} as const satisfies TextProperty
