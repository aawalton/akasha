import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const silverglowEnchantment = {
  id: "01a06572-95e1-7bae-b7f8-40f8be890cc7",
  type: "page-type/world-spell",
  slug: "silverglow-enchantment",
  title: "Silverglow Enchantment",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
