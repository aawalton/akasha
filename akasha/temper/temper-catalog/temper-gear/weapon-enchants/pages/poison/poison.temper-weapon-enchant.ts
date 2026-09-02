import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const poison = {
  id: "01a05fd8-a45b-7c0d-a1eb-df2757e0b061",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "poison",
  title: "Poison",
  key: "poison",
  effect: "Deals poison damage on proc",
  glyphName: "Glyph of Poison",
  essenceRune: "Kuoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON",
  displayOrder: 10,
} as const satisfies TemperWeaponEnchant
