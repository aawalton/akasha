import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const training = {
  id: "01a05fd8-a462-7133-b130-fb9e32e72f9e",
  pageTypeSlug: "temper-weapon-trait",
  slug: "training",
  title: "Training",
  key: "training",
  effect: "Increases Experience Gain (No Combat Effect)",
  material: "Carnelian",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_TRAINING",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
