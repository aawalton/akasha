import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const values = {
  id: "01a06553-f660-780a-9cc7-a675d664e202",
  pageTypeSlug: "readout-group",
  slug: "values",
  definition: "how well the day served each of Alan's values",
  sortOrder: "place",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every value runs the same multiplier ladder and only its baseline differs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value's figure sums its personas' raw units rather than flooring each unit to a rung.",
    },
  ],
} as const satisfies ReadoutGroup
