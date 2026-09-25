import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const surplus = {
  id: "01a05fc3-145a-74b9-bd54-23090ceb85d8",
  type: "page-type/readout-group",
  slug: "surplus",
  definition: "how much of Alan's night the day has left him",
  wireKeyName: "habit",
  servedBy: ["route/surplus", "route/jenny-surplus"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the hours the night had less the hours the day spent.",
    },
  ],
} as const satisfies ReadoutGroup
