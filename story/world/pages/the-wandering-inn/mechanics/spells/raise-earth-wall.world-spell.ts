import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const raiseEarthWall = {
  id: "01a06572-95dc-792f-b7d8-73cb97c24976",
  type: "page-type/world-spell",
  slug: "raise-earth-wall",
  title: "Raise Earth Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
