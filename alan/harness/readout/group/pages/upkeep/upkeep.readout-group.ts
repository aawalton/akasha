import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const upkeep = {
  id: "01a061f8-78c4-77eb-b16d-6b8c123a7f0a",
  type: "page-type/readout-group",
  slug: "upkeep",
  definition: "whether Alan keeps himself well",
  figureOffScale: true,
  wireKeyName: "habit",
  servedBy: ["route/habit-stoplights", "route/jenny-upkeep"],
  createdAt: "2026-09-02T11:54:28.932Z",
  updatedAt: "2026-10-30T15:59:46.288Z",
} as const satisfies ReadoutGroup
