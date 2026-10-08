import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sleep = {
  id: "01a06572-95e1-7d06-8b84-b0ab1e493347",
  type: "page-type/world-spell",
  slug: "sleep",
  title: "Sleep",
  world: "world/the-wandering-inn",
  appearanceCount: 27,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
