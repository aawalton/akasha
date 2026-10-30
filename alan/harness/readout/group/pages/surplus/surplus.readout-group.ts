import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const surplus = {
  id: "01a05fc3-145a-74b9-bd54-23090ceb85d8",
  type: "page-type/readout-group",
  slug: "surplus",
  definition: "the remaining hours Alan has for sleep",
  wireKeyName: "habit",
  servedBy: ["route/surplus", "route/jenny-surplus", "module/surplus-fall-ticking"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the hours the night had less the hours the day spent.",
    },
  ],
  createdAt: "2026-09-02T01:36:55.386Z",
  updatedAt: "2026-10-30T15:59:14.321Z",
} as const satisfies ReadoutGroup
