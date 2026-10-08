import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const prismaticWall = {
  id: "01a06572-95db-7c7e-92b3-72abe38db46a",
  type: "page-type/world-spell",
  slug: "prismatic-wall",
  title: "Prismatic Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
