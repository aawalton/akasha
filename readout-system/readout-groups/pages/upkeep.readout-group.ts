import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const upkeep = {
  id: "01a061f8-78c4-77eb-b16d-6b8c123a7f0a",
  pageTypeSlug: "readout-group",
  slug: "upkeep",
  definition: "whether the daily keeping of Alan and his surroundings is holding",
  sequenceSlugs: [
    "readout/upkeep-safety",
    "readout/upkeep-surplus",
    "readout/upkeep-capacity",
    "readout/upkeep-sleep",
  ],
  sortOrder: "place",
} as const satisfies ReadoutGroup
