import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceSpears = {
  id: "01a06572-95c9-74c9-9182-a3b899d8cbf2",
  type: "page-type/world-spell",
  slug: "ice-spears",
  title: "Ice Spears",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
