import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"

export const crushing = {
  id: "019e5c0d-dcf2-7ea9-8369-59125d45ba78",
  type: "page-type/temper-weapon-enchant",
  slug: "crushing",
  title: "Crushing",
  key: "crushing",
  effect: "Reduces target armor for 5 seconds (proc-based with ~50% uptime)",
  glyphName: "Glyph of Crushing",
  essenceRune: "Derado",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR",
  displayOrder: 5,
  effects: "jsonl",
} as const satisfies TemperWeaponEnchant
