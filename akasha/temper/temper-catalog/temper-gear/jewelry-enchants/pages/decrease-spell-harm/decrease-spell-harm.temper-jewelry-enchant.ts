import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const decreaseSpellHarm = {
  id: "01a05fd8-a42e-72ed-8119-dc64ad2afa59",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "decrease-spell-harm",
  title: "Decrease Spell Harm",
  key: "decrease-spell-harm",
  effect: "Increases Spell Resistance",
  glyphName: "Glyph of Decrease Spell Harm",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE",
  displayOrder: 16,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
