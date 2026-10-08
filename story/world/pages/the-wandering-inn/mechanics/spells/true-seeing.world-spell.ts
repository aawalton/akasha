import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const trueSeeing = {
  id: "01a06572-95e7-770d-96d1-0a18290c64fd",
  type: "page-type/world-spell",
  slug: "true-seeing",
  title: "True Seeing",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
