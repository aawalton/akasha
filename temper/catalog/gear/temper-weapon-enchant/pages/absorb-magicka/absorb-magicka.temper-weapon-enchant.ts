import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"

export const absorbMagicka = {
  id: "019e5c0d-dcee-75cd-adc6-d61e688bd9d5",
  type: "page-type/temper-weapon-enchant",
  slug: "absorb-magicka",
  title: "Absorb Magicka",
  key: "absorb-magicka",
  effect: "Deals damage and returns magicka (proc-based)",
  glyphName: "Glyph of Absorb Magicka",
  essenceRune: "Makkoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA",
  displayOrder: 3,
  hashPlace: 3,
  esoEnchantSearchCategory: 23,
  createdAt: "2026-05-24T22:14:32.942Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperWeaponEnchant
