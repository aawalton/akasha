import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const absorbHealth = {
  id: "01a05fd8-a459-7267-87f6-981a8431a4bc",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "absorb-health",
  title: "Absorb Health",
  key: "absorb-health",
  effect: "Deals damage over time and returns health (proc-based)",
  glyphName: "Glyph of Absorb Health",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH",
  displayOrder: 2,
} as const satisfies TemperWeaponEnchant
