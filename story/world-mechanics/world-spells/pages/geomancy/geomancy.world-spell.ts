import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const geomancy = {
  id: "01a06572-95c6-79b4-a1df-da45a5162d71",
  type: "world-spell",
  slug: "geomancy",
  title: "Geomancy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
