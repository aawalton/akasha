import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceSpike = {
  id: "01a06572-95ca-7fa4-b240-21f45f24d002",
  type: "page-type/world-spell",
  slug: "ice-spike",
  title: "Ice Spike",
  world: "world/the-wandering-inn",
  appearanceCount: 55,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.402Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
