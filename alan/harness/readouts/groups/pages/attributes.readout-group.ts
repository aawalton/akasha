import type { ReadoutGroup } from "akasha/alan/harness/readouts/groups/readout-group.page-type.types.ts"

export const attributes = {
  id: "01a06838-93eb-7a05-b58a-95b892c0febf",
  pageTypeSlug: "readout-group",
  type: "readout-group",
  slug: "attributes",
  definition: "the attributes Alan's daily upkeep habits earned on a day",
  sortOrder: "place",
  figureOffScale: true,
} as const satisfies ReadoutGroup
