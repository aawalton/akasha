import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const frost = {
  id: "01a05fd8-a45b-7d5b-87d7-db0ee2f630a6",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "frost",
  title: "Frost",
  key: "frost",
  effect: "Deals frost damage on proc",
  glyphName: "Glyph of Frost",
  essenceRune: "Dekeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON",
  displayOrder: 8,
} as const satisfies TemperWeaponEnchant
