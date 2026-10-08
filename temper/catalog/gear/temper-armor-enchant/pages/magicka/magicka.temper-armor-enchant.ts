import type { TemperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.types.ts"

export const magicka = {
  id: "01a05fd4-d96b-7fb6-8535-b1728715ed14",
  type: "page-type/temper-armor-enchant",
  slug: "magicka",
  title: "Magicka",
  key: "magicka",
  effect: "Increases Maximum Magicka",
  glyphName: "Glyph of Magicka",
  essenceRune: "Makko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA",
  displayOrder: 2,
  effects: "jsonl",
  hashPlace: 2,
  esoEnchantSearchCategory: 13,
  createdAt: "2026-09-02T01:56:19.947Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperArmorEnchant
