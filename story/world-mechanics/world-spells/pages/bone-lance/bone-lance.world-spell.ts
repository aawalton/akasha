import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boneLance = {
  id: "01a06572-95b7-75a1-9bdb-dabcd50d1ca8",
  type: "world-spell",
  slug: "bone-lance",
  title: "Bone…Lance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
