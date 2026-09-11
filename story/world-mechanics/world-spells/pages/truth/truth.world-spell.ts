import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const truth = {
  id: "01a06572-95e7-704a-b82b-c63c8d576857",
  type: "world-spell",
  slug: "truth",
  title: "Truth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
