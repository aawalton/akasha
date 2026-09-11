import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceFloor = {
  id: "01a06572-95c9-780c-bda1-f5927df1e666",
  type: "world-spell",
  slug: "ice-floor",
  title: "Ice Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
