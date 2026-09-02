import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const foulness = {
  id: "01a05fd8-a45a-7bdf-b72c-5651d3595dd7",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "foulness",
  title: "Foulness",
  key: "foulness",
  effect: "Deals disease damage on proc",
  glyphName: "Glyph of Foulness",
  essenceRune: "Haoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON",
  displayOrder: 13,
} as const satisfies TemperWeaponEnchant
