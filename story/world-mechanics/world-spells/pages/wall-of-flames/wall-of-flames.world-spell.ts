import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfFlames = {
  id: "01a06572-95e9-76c0-8f3a-d1455841e634",
  type: "world-spell",
  slug: "wall-of-flames",
  title: "Wall of Flames",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
