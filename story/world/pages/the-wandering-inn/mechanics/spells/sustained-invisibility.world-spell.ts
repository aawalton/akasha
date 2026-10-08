import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sustainedInvisibility = {
  id: "01a06572-95e4-766f-80c8-75d3bfeff521",
  type: "page-type/world-spell",
  slug: "sustained-invisibility",
  title: "Sustained Invisibility",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
