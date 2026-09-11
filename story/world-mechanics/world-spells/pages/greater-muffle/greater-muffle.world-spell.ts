import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterMuffle = {
  id: "01a06572-95c7-7a9a-831f-e57cd8eea6a1",
  type: "world-spell",
  slug: "greater-muffle",
  title: "Greater Muffle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
