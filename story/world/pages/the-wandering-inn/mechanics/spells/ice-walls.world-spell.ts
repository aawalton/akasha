import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceWalls = {
  id: "01a06572-95ca-7a93-b815-cb5df6a4de97",
  type: "page-type/world-spell",
  slug: "ice-walls",
  title: "Ice Walls",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.402Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
