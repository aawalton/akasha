import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fogOfApathy = {
  id: "01a06572-95c4-736a-9ca1-20092a1ea9c7",
  type: "page-type/world-spell",
  slug: "fog-of-apathy",
  title: "Fog of Apathy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
