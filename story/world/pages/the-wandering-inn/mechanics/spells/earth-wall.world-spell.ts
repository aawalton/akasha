import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthWall = {
  id: "01a06572-95be-75f5-9fa1-0e2a4988808a",
  type: "page-type/world-spell",
  slug: "earth-wall",
  title: "Earth Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
