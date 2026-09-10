import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type OwnLength = number

export const ownLength = {
  id: "01a06553-4713-7000-832b-753158e3fec9",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "own-length",
  propertySlug: "own-length",
  definition: "how long a collection is, counted in its own unit",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A length is the collection's own rather than the sum of the parts that collection has.",
    },
  ],
} as const satisfies NumberProperty
