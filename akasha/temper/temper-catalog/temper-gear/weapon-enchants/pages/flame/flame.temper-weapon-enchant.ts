import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const flame = {
  id: "01a05fd8-a45a-701c-a08d-02218f85b6c4",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "flame",
  title: "Flame",
  key: "flame",
  effect: "Deals fire damage on proc",
  glyphName: "Glyph of Flame",
  essenceRune: "Rakeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON",
  displayOrder: 7,
} as const satisfies TemperWeaponEnchant
