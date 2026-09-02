import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const charged = {
  id: "01a05fd8-a45d-7d90-8ae3-1583c78d6a03",
  pageTypeSlug: "temper-weapon-trait",
  slug: "charged",
  title: "Charged",
  key: "charged",
  effect: "Increases Status Effect Chance",
  material: "Amethyst",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_CHARGED",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
