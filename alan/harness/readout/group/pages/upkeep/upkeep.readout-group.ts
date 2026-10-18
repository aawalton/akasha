import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const upkeep = {
  id: "01a061f8-78c4-77eb-b16d-6b8c123a7f0a",
  type: "page-type/readout-group",
  slug: "upkeep",
  definition: "whether the daily keeping of Alan and his surroundings is holding",
  figureOffScale: true,
  wireKeyName: "habit",
  statusBarSection: "upkeep",
  servedBy: ["route/habit-stoplights", "route/jenny-upkeep"],
  createdAt: "2026-09-02T11:54:28.932Z",
  updatedAt: "2026-10-18T13:21:00.027Z",
} as const satisfies ReadoutGroup
