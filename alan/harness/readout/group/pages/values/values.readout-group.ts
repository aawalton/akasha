import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const values = {
  id: "01a06553-f660-780a-9cc7-a675d664e202",
  type: "page-type/readout-group",
  slug: "values",
  definition: "the progress Alan makes on each life value in a day",
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
  updatedAt: "2026-10-30T16:32:59.308Z",
} as const satisfies ReadoutGroup
