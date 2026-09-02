import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const noEnchant = {
  id: "01a05fd8-a45b-785b-992e-f8131a87b808",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "no-enchant",
  title: "No Enchant",
  key: "no-enchant",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  displayOrder: 0,
} as const satisfies TemperWeaponEnchant
