import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const absorbMagicka = {
  id: "01a05fd8-a459-7973-9773-9af4546d9b4f",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "absorb-magicka",
  title: "Absorb Magicka",
  key: "absorb-magicka",
  effect: "Deals damage and returns magicka (proc-based)",
  glyphName: "Glyph of Absorb Magicka",
  essenceRune: "Makkoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA",
  displayOrder: 3,
} as const satisfies TemperWeaponEnchant
