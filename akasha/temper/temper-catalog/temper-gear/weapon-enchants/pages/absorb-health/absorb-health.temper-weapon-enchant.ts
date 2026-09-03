import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const absorbHealth = {
  id: "019e5c0d-dceb-74ca-8a7f-64f3f44ddae1",
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
