import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const powered = {
  id: "01a05fd8-a461-7c9f-9bdb-5bb2a95dbb7b",
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
