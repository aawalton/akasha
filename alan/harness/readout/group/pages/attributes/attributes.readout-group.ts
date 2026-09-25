import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const attributes = {
  id: "01a06838-93eb-7a05-b58a-95b892c0febf",
  type: "page-type/readout-group",
  slug: "attributes",
  definition: "the attributes Alan's daily upkeep habits earned on a day",
  figureOffScale: true,
  wireKeyName: "attribute",
  servedBy: ["route/attribute-stoplights"],
} as const satisfies ReadoutGroup
