import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceSpikeSpray = {
  id: "01a06572-95c9-7ad5-a672-2ec3f90f9c9d",
  type: "world-spell",
  slug: "ice-spike-spray",
  title: "Ice Spike Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
