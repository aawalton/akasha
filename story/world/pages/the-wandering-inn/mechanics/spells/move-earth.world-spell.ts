import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const moveEarth = {
  id: "01a06572-95d9-7e57-bd44-cc51657aa7d4",
  type: "page-type/world-spell",
  slug: "move-earth",
  title: "Move Earth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
