import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const bloodthirsty = {
  id: "019e5b97-6d87-7ebe-8b8a-90f7afd5b457",
  type: "page-type/temper-jewelry-trait",
  slug: "bloodthirsty",
  title: "Bloodthirsty",
  key: "bloodthirsty",
  effect:
    "Increases Weapon and Spell Damage against enemies under 90% Health (scales with missing health)",
  material: "Slaughterstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY",
  displayOrder: 2,
} as const satisfies TemperJewelryTrait
