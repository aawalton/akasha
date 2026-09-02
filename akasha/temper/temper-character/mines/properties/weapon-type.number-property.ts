import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeaponType = number

export const weaponType = {
  id: "01a05fcd-f556-7eb5-9e6b-ab73d155b68a",
  pageTypeSlug: "number-property",
  slug: "weapon-type",
  propertySlug: "weapon-type",
  definition: "the sort of weapon an item is",
  max: null,
} as const satisfies NumberProperty
