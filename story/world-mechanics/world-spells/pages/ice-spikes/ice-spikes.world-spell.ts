import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceSpikes = {
  id: "01a06572-95ca-7101-900a-687927877d5f",
  type: "world-spell",
  slug: "ice-spikes",
  title: "Ice Spikes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
