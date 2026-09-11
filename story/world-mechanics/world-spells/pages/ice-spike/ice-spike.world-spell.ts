import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceSpike = {
  id: "01a06572-95ca-7fa4-b240-21f45f24d002",
  type: "world-spell",
  slug: "ice-spike",
  title: "Ice Spike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
