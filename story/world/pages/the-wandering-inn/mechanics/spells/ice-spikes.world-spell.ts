import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceSpikes = {
  id: "01a06572-95ca-7101-900a-687927877d5f",
  type: "page-type/world-spell",
  slug: "ice-spikes",
  title: "Ice Spikes",
  world: "world/the-wandering-inn",
  appearanceCount: 29,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.402Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
