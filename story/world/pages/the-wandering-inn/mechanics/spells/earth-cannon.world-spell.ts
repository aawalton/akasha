import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthCannon = {
  id: "01a06572-95be-74cd-a4e3-9c354699a543",
  type: "page-type/world-spell",
  slug: "earth-cannon",
  title: "Earth Cannon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
