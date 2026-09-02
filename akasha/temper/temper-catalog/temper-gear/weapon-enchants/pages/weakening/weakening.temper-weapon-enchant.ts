import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const weakening = {
  id: "01a05fd8-a45c-7e7f-8b93-bd2f986a6ebd",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "weakening",
  title: "Weakening",
  key: "weakening",
  effect: "Reduces target weapon and spell damage on proc",
  glyphName: "Glyph of Weakening",
  essenceRune: "Okori",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER",
  displayOrder: 11,
} as const satisfies TemperWeaponEnchant
