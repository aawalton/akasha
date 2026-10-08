import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyGround = {
  id: "01a06572-95e3-7d80-a1ce-55b162af3511",
  type: "page-type/world-spell",
  slug: "sticky-ground",
  title: "Sticky Ground",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
