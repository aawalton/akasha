import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonBlackHole = {
  id: "01a06572-95e4-7442-b8c6-d2f0bfbeba37",
  type: "page-type/world-spell",
  slug: "summon-black-hole",
  title: "Summon Black Hole",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
