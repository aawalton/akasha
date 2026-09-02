import type { TemperArmorEnchant } from "../../temper-armor-enchant.page-type.ts"

export const health = {
  id: "01a05fd4-d96a-7f26-be77-be4206893578",
  pageTypeSlug: "temper-armor-enchant",
  slug: "health",
  title: "Health",
  key: "health",
  effect: "Increases Maximum Health",
  glyphName: "Glyph of Health",
  essenceRune: "Oko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorEnchant
