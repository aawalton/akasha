import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornArrow = {
  id: "01a06572-95e6-719b-9e2d-803a2881b6c7",
  type: "page-type/world-spell",
  slug: "thorn-arrow",
  title: "Thorn Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
