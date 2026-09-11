import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const franticMarching = {
  id: "01a06572-95c5-70e5-9eac-55172d6fbea6",
  type: "world-spell",
  slug: "frantic-marching",
  title: "Frantic Marching",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
