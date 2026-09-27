import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const armorLevelScale = {
  id: "01a0e113-0582-72c4-a28c-5db09dbae153",
  type: "page-type/number-property",
  slug: "armor-level-scale",
  propertySlug: "armor-level-scale",
  definition:
    "the share of a legendary body piece's level-scaled armor a piece of this quality has",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
