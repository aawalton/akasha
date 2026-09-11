import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thornPaw = {
  id: "01a06572-95e6-70ce-a675-7e9776508c6c",
  type: "world-spell",
  slug: "thorn-paw",
  title: "Thorn Paw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
