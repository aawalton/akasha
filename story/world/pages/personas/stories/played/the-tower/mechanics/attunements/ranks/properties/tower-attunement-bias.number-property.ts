import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const towerAttunementBias = {
  id: "01a0ca74-3713-72a2-9386-a8f1ccf31c74",
  type: "page-type/number-property",
  slug: "tower-attunement-bias",
  propertySlug: "bias",
  definition: "how much a rung adds to intent on an act matching its element",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
