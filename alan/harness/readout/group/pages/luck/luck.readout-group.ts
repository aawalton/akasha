import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const luck = {
  id: "01a0aa31-232f-7493-8ae5-ea9cf4823642",
  type: "page-type/readout-group",
  slug: "luck",
  definition: "how much Alan has risked being told no today",
  sortOrder: "place",
  figureOffScale: true,
} as const satisfies ReadoutGroup
