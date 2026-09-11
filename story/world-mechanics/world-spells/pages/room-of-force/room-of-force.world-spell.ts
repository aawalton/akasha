import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const roomOfForce = {
  id: "01a06572-95de-7d6d-bedc-2e4719acd443",
  type: "world-spell",
  slug: "room-of-force",
  title: "Room of Force",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
