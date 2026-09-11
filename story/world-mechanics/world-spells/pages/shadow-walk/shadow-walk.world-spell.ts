import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shadowWalk = {
  id: "01a06572-95df-7243-a442-23a8f127d5eb",
  type: "world-spell",
  slug: "shadow-walk",
  title: "Shadow Walk",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
