import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const heartOfTheStorm = {
  id: "01a06572-95c8-708a-8013-99b54821a231",
  type: "world-spell",
  slug: "heart-of-the-storm",
  title: "Heart of the Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
