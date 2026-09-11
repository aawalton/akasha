import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const completeMuffle = {
  id: "01a06572-95b9-7abf-b918-4da25c2cdb2a",
  type: "world-spell",
  slug: "complete-muffle",
  title: "Complete Muffle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
