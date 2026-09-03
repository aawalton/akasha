import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LowestInboxCount = number

export const lowestInboxCount = {
  id: "01a0682f-644d-789e-b922-919b32413cb3",
  pageTypeSlug: "number-property",
  slug: "lowest-inbox-count",
  propertySlug: "lowest-inbox-count",
  definition: "the fewest messages Alan's inbox held at any reading this day",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading of a hundred means a hundred or more, which is where the count stops.",
    },
    {
      invariantKind: "departure",
      statement: "A lowest inbox count is captured by trace.",
    },
  ],
} as const satisfies NumberProperty
