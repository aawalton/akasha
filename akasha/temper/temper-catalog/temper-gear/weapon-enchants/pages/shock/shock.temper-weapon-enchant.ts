import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const shock = {
  id: "01a05fd8-a45c-7796-9a08-0338e6c95234",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "shock",
  title: "Shock",
  key: "shock",
  effect: "Deals shock damage on proc",
  glyphName: "Glyph of Shock",
  essenceRune: "Meip",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON",
  displayOrder: 9,
} as const satisfies TemperWeaponEnchant
