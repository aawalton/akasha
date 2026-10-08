import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wildGrowth = {
  id: "01a06572-95ea-746c-99af-40ced9a11119",
  type: "page-type/world-spell",
  slug: "wild-growth",
  title: "Wild Growth",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
