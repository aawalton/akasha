import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const decreaseHealth = {
  id: "01a05fd8-a45a-72c5-a43b-625b62428d4b",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "decrease-health",
  title: "Decrease Health",
  key: "decrease-health",
  effect: "Deals instant damage on proc",
  glyphName: "Glyph of Decrease Health",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH",
  displayOrder: 6,
} as const satisfies TemperWeaponEnchant
