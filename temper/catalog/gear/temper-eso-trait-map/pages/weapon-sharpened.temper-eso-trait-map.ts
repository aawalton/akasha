import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponSharpened = {
  id: "01a05fd7-41d0-7fc9-a4a1-a686707a8fd7",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-sharpened",
  title: "Weapon Sharpened",
  key: "weapon:sharpened",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/sharpened",
  esoTraitNum: 7,
  displayOrder: 7,
} as const satisfies TemperEsoTraitMap
