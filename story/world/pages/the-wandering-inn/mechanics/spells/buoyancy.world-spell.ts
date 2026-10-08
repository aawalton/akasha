import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const buoyancy = {
  id: "01a06572-95b8-7ef7-9f8a-5b7f050e0f31",
  type: "page-type/world-spell",
  slug: "buoyancy",
  title: "Buoyancy",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
