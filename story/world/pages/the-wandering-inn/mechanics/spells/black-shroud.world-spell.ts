import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackShroud = {
  id: "01a06572-95b6-7bc2-8d2b-e22c79db5ed9",
  type: "page-type/world-spell",
  slug: "black-shroud",
  title: "Black Shroud",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
