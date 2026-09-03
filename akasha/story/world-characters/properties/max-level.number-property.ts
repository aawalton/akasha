import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxLevel = number

export const maxLevel = {
  id: "01a0657a-9ccc-799d-b3da-5f74e280345a",
  pageTypeSlug: "number-property",
  slug: "max-level",
  propertySlug: "max-level",
  definition: "the highest level a story ever gives a character",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The highest level is what the text states rather than what a tally reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A character the text never levels carries no highest level.",
    },
  ],
} as const satisfies NumberProperty
