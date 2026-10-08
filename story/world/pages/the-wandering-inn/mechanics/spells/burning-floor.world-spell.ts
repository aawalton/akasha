import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const burningFloor = {
  id: "01a06572-95b8-70f1-9162-209269509aa6",
  type: "page-type/world-spell",
  slug: "burning-floor",
  title: "Burning Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
