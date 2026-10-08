import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const values = {
  id: "01a06553-f660-780a-9cc7-a675d664e202",
  type: "page-type/readout-group",
  slug: "values",
  definition: "how well the day served each of Alan's values",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value runs the same multiplier ladder and only its baseline differs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value's figure sums its personas' raw units rather than flooring each unit to a rung.",
    },
  ],
  createdAt: "2026-09-03T03:33:16.512Z",
  updatedAt: "2026-09-21T17:14:54.000Z",
} as const satisfies ReadoutGroup
