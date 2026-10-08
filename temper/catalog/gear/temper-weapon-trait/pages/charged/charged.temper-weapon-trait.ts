import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"

export const charged = {
  id: "019e5b8b-e53c-79f0-81dc-92d792e3fb6f",
  type: "page-type/temper-weapon-trait",
  slug: "charged",
  title: "Charged",
  key: "charged",
  effect: "Increases Status Effect Chance",
  material: "Amethyst",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_CHARGED",
  displayOrder: 1,
  effects: "jsonl",
  hashPlace: 1,
  available: true,
  createdAt: "2026-05-24T19:52:35.388Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperWeaponTrait
