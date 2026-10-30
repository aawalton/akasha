import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const resources = {
  id: "01a14f36-ea31-7f7a-831a-a3c2c842e017",
  type: "page-type/readout-group",
  slug: "resources",
  definition: "the resources Alan spends and what Alan does to restore those resources",
  figureOffScale: true,
  wireKeyName: "resource",
  statusBarSection: "resources",
  servedBy: ["route/resources-stoplights"],
  createdAt: "2026-10-18T13:32:41.384Z",
  updatedAt: "2026-10-30T16:04:07.855Z",
} as const satisfies ReadoutGroup
