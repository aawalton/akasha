import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fogOfApathy = {
  id: "01a06572-95c4-736a-9ca1-20092a1ea9c7",
  type: "world-spell",
  slug: "fog-of-apathy",
  title: "Fog of Apathy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
