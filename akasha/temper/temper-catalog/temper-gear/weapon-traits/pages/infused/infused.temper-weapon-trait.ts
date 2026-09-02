import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const infused = {
  id: "01a05fd8-a45f-7c32-ab7e-89a8a0266516",
  pageTypeSlug: "temper-weapon-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Enchantment Effectiveness",
  material: "Jade",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_INFUSED",
  displayOrder: 4,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
