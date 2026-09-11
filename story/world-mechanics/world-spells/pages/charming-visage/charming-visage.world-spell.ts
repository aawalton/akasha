import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const charmingVisage = {
  id: "01a06572-95b8-7041-93a0-b683b8d5c3ac",
  type: "world-spell",
  slug: "charming-visage",
  title: "Charming Visage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
