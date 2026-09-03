import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const attributes = {
  id: "01a06838-93eb-7a05-b58a-95b892c0febf",
  pageTypeSlug: "readout-group",
  slug: "attributes",
  definition: "the attributes Alan's daily upkeep habits earned on a day",
  partSlugs: [
    "readout/attribute-strength",
    "readout/attribute-endurance",
    "readout/attribute-constitution",
    "readout/attribute-wisdom",
    "readout/attribute-intelligence",
    "readout/attribute-charisma",
  ],
  sequenceSlugs: [
    "readout/attribute-strength",
    "readout/attribute-endurance",
    "readout/attribute-constitution",
    "readout/attribute-wisdom",
    "readout/attribute-intelligence",
    "readout/attribute-charisma",
  ],
  sortOrder: "place",
} as const satisfies ReadoutGroup
