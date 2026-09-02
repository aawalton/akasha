import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const prismaticOnslaught = {
  id: "01a05fd8-a45c-735c-9c84-91a304e7606f",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "prismatic-onslaught",
  title: "Prismatic Onslaught",
  key: "prismatic-onslaught",
  effect: "Deals multi-element damage on proc",
  glyphName: "Glyph of Prismatic Onslaught",
  essenceRune: "Hakeijo",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT",
  displayOrder: 14,
} as const satisfies TemperWeaponEnchant
