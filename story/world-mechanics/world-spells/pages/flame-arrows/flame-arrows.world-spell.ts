import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameArrows = {
  id: "01a06572-95c3-7dc9-8ca6-59d70f8aecc4",
  type: "world-spell",
  slug: "flame-arrows",
  title: "Flame Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
