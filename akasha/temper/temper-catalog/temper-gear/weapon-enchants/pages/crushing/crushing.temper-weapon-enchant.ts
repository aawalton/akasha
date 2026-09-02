import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const crushing = {
  id: "01a05fd8-a459-706e-aa83-92021dc29f0a",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "crushing",
  title: "Crushing",
  key: "crushing",
  effect: "Reduces target armor for 5 seconds (proc-based with ~50% uptime)",
  glyphName: "Glyph of Crushing",
  essenceRune: "Derado",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR",
  displayOrder: 5,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponEnchant
