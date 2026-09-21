import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"

export const noEnchant = {
  id: "019e5c0d-dce3-7e6a-89e5-5d15c73035fd",
  type: "page-type/temper-weapon-enchant",
  slug: "no-enchant",
  title: "No Enchant",
  key: "no-enchant",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  displayOrder: 0,
} as const satisfies TemperWeaponEnchant
