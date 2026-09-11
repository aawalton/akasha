import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const theMidnightVeil = {
  id: "01a06572-95e6-7f04-9076-7c8462342b74",
  type: "world-spell",
  slug: "the-midnight-veil",
  title: "The Midnight Veil",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
