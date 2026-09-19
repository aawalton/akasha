import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arrowsOfTheLightningQueen = {
  id: "01a06572-95b5-7ab7-9a01-a09341cbb5c2",
  type: "page-type/world-spell",
  slug: "arrows-of-the-lightning-queen",
  title: "Arrows of the Lightning Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
