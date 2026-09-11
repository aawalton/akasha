import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthquake = {
  id: "01a06572-95bf-7955-84ac-da2026dc9028",
  type: "world-spell",
  slug: "earthquake",
  title: "Earthquake",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
