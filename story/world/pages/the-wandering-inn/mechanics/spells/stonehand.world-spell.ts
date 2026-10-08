import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stonehand = {
  id: "01a06572-95e4-74c1-af92-8b74caeac75d",
  type: "page-type/world-spell",
  slug: "stonehand",
  title: "Stonehand",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
