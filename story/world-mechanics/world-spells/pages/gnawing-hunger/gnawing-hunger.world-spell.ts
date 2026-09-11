import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gnawingHunger = {
  id: "01a06572-95c6-7107-aba1-6802d98a1893",
  type: "world-spell",
  slug: "gnawing-hunger",
  title: "Gnawing Hunger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
