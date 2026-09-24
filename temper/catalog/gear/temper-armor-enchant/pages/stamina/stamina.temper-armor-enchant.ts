import type { TemperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.types.ts"

export const stamina = {
  id: "01a05fd4-d96c-7e66-8940-ca31af8c2c46",
  type: "page-type/temper-armor-enchant",
  slug: "stamina",
  title: "Stamina",
  key: "stamina",
  effect: "Increases Maximum Stamina",
  glyphName: "Glyph of Stamina",
  essenceRune: "Deni",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA",
  displayOrder: 3,
  effects: "jsonl",
} as const satisfies TemperArmorEnchant
