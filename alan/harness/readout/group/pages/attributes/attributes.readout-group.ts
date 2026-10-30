import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const attributes = {
  id: "01a06838-93eb-7a05-b58a-95b892c0febf",
  type: "page-type/readout-group",
  slug: "attributes",
  definition: "the points Alan earns for each attribute in a day",
  figureOffScale: true,
  wireKeyName: "attribute",
  servedBy: ["route/attribute-stoplights"],
  createdAt: "2026-09-03T17:02:13.483Z",
  updatedAt: "2026-10-30T15:59:57.799Z",
} as const satisfies ReadoutGroup
