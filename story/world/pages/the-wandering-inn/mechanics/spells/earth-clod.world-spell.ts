import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthClod = {
  id: "01a06572-95be-71bc-a433-cf332d64b1de",
  type: "page-type/world-spell",
  slug: "earth-clod",
  title: "Earth Clod",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
