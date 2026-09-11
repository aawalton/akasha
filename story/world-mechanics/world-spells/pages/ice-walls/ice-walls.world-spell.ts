import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceWalls = {
  id: "01a06572-95ca-7a93-b815-cb5df6a4de97",
  type: "world-spell",
  slug: "ice-walls",
  title: "Ice Walls",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
