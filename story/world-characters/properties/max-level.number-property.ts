import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type MaxLevel = number

export const maxLevel = {
  id: "01a0657a-9ccc-799d-b3da-5f74e280345a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "max-level",
  propertySlug: "max-level",
  definition: "the highest level a story ever gives a character",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The highest level is the level the text states rather than the number a tally reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A character the text never levels has no highest level.",
    },
  ],
} as const satisfies NumberProperty
