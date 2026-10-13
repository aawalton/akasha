import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const connection = {
  id: "01a13584-9f8b-7486-bb02-c83e1ea91f9c",
  type: "page-type/readout-group",
  slug: "connection",
  definition: "how much of Alan's day was spent at ease with Jenny",
  figureOffScale: true,
  wireKeyName: "habit",
  servedBy: ["route/jenny-connection"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile draws the one reading alone.",
    },
  ],
  createdAt: "2026-10-13T13:47:26.474Z",
  updatedAt: "2026-10-13T13:49:28.044Z",
} as const satisfies ReadoutGroup
