import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceFloor = {
  id: "01a06572-95c9-780c-bda1-f5927df1e666",
  type: "page-type/world-spell",
  slug: "ice-floor",
  title: "Ice Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
