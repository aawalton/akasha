import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const infused = {
  id: "019e5b97-6d8f-7b57-8e9e-8816c82ecefd",
  type: "page-type/temper-jewelry-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Jewelry Enchantment effect",
  material: "Aurbic Amber",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_INFUSED",
  displayOrder: 5,
} as const satisfies TemperJewelryTrait
