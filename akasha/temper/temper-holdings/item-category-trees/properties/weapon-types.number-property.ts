import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeaponTypes = number

export const weaponTypes = {
  id: "01a05fcb-fd32-7104-a7bf-b581f92aa91e",
  pageTypeSlug: "number-property",
  slug: "weapon-types",
  propertySlug: "weapon-types",
  definition: "a weapon type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
