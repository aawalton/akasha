import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const madrinelSIntrusion = {
  id: "01a06572-95d0-737f-a57e-0b4bd309cee8",
  type: "world-spell",
  slug: "madrinel-s-intrusion",
  title: "Madrinel’s Intrusion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
