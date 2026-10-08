import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfFlames = {
  id: "01a06572-95e9-76c0-8f3a-d1455841e634",
  type: "page-type/world-spell",
  slug: "wall-of-flames",
  title: "Wall of Flames",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
