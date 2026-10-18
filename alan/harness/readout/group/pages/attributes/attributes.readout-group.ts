import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const attributes = {
  id: "01a06838-93eb-7a05-b58a-95b892c0febf",
  type: "page-type/readout-group",
  slug: "attributes",
  definition: "the attributes Alan's daily upkeep habits earned on a day",
  figureOffScale: true,
  wireKeyName: "attribute",
  statusBarSection: "attributes",
  servedBy: ["route/attribute-stoplights"],
  createdAt: "2026-09-03T17:02:13.483Z",
  updatedAt: "2026-10-18T13:21:00.027Z",
} as const satisfies ReadoutGroup
