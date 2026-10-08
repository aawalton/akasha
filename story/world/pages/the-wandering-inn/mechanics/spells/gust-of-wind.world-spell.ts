import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gustOfWind = {
  id: "01a06572-95c8-73ac-8c9d-d8c3437e4b57",
  type: "page-type/world-spell",
  slug: "gust-of-wind",
  title: "Gust of Wind",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
