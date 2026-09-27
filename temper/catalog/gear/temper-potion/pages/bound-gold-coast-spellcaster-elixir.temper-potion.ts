import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const boundGoldCoastSpellcasterElixir = {
  id: "01a0e108-307d-75e5-85dc-a145ae155dc0",
  type: "page-type/temper-potion",
  slug: "bound-gold-coast-spellcaster-elixir",
  title: "Bound Gold Coast Spellcaster Elixir",
  key: "bound-gold-coast-spellcaster-elixir",
  itemId: 135125,
  restores: ["temper-metric/magicka-restore"],
} as const satisfies TemperPotion
