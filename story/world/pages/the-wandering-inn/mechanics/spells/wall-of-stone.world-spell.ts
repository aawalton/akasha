import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfStone = {
  id: "01a06572-95e9-7944-bf4c-36638d562c0c",
  type: "page-type/world-spell",
  slug: "wall-of-stone",
  title: "Wall of Stone",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
