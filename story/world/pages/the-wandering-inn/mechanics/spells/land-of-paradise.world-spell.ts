import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const landOfParadise = {
  id: "01a06572-95cc-7e2c-ab03-7e5be77c4ffc",
  type: "page-type/world-spell",
  slug: "land-of-paradise",
  title: "Land of Paradise",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
