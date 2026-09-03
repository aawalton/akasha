import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const shock = {
  id: "019e5c0d-dcf9-7174-9596-b3de8225e9d7",
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
