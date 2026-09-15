import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const silverglowEnchantment = {
  id: "01a06572-95e1-7bae-b7f8-40f8be890cc7",
  type: "world-spell",
  slug: "silverglow-enchantment",
  title: "Silverglow Enchantment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
