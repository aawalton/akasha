import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const bloodthirsty = {
  id: "01a05fd8-a434-7f63-8d66-a1857f08eca2",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "bloodthirsty",
  title: "Bloodthirsty",
  key: "bloodthirsty",
  effect:
    "Increases Weapon and Spell Damage against enemies under 90% Health (scales with missing health)",
  material: "Slaughterstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY",
  displayOrder: 2,
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
