import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hammerOfTheMountainKing = {
  id: "01a06572-95c8-7bd2-b628-e0363335ab12",
  type: "page-type/world-spell",
  slug: "hammer-of-the-mountain-king",
  title: "Hammer of the Mountain King",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
