import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const hardening = {
  id: "01a05fd8-a45b-7d10-add4-8da06b4d95fa",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "hardening",
  title: "Hardening",
  key: "hardening",
  effect: "Grants a damage shield on proc",
  glyphName: "Glyph of Hardening",
  essenceRune: "Derado",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD",
  displayOrder: 12,
} as const satisfies TemperWeaponEnchant
