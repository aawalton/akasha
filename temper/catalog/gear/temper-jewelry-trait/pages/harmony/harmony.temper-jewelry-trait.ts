import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const harmony = {
  id: "019e5b97-6d8a-77b7-8303-2086b16d9817",
  type: "page-type/temper-jewelry-trait",
  slug: "harmony",
  title: "Harmony",
  key: "harmony",
  effect: "Activating a synergy restores 880 Health, Magicka, and Stamina",
  material: "Dibellium",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HARMONY",
  displayOrder: 3,
} as const satisfies TemperJewelryTrait
