import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterArrow = {
  id: "01a06572-95e9-7583-bb15-755d7f18237a",
  type: "page-type/world-spell",
  slug: "water-arrow",
  title: "Water Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
