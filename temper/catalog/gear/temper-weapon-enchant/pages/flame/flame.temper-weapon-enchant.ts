import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"

export const flame = {
  id: "019e5c0d-dcf6-70c2-b137-99c98be7f05f",
  type: "page-type/temper-weapon-enchant",
  slug: "flame",
  title: "Flame",
  key: "flame",
  effect: "Deals fire damage on proc",
  glyphName: "Glyph of Flame",
  essenceRune: "Rakeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON",
  displayOrder: 7,
  hashPlace: 7,
  esoEnchantSearchCategory: 6,
  createdAt: "2026-05-24T22:14:32.950Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperWeaponEnchant
