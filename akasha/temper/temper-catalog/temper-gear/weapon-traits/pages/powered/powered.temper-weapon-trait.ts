import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const powered = {
  id: "019e5b8b-e549-7d10-841e-e3e8cfe05a8d",
  pageTypeSlug: "temper-weapon-trait",
  slug: "powered",
  title: "Powered",
  key: "powered",
  effect: "Increases Healing Done",
  material: "Chysolite",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_POWERED",
  displayOrder: 6,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
