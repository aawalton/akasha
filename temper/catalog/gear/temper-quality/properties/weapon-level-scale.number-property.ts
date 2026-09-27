import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const weaponLevelScale = {
  id: "01a0e113-0582-7e3a-ab19-fc507d815e8c",
  type: "page-type/number-property",
  slug: "weapon-level-scale",
  propertySlug: "weapon-level-scale",
  definition: "the share of a legendary weapon's level-scaled power a weapon of this quality has",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
