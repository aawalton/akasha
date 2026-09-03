import type { NumberProperty } from "@akasha/pages-system/number-property"

export type OwnLength = number

export const ownLength = {
  id: "01a064b4-46c9-7363-8785-2a3b0d017f62",
  pageTypeSlug: "number-property",
  slug: "own-length",
  propertySlug: "own-length",
  definition: "how long a collection's own text runs, counted in its unit",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A length here counts the text one page carries rather than what its parts carry.",
    },
    {
      invariantKind: "gap",
      statement: "A collection carries this property rather than each kind of collection.",
    },
  ],
} as const satisfies NumberProperty
