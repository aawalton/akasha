import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lavaRain = {
  id: "01a06572-95cc-7088-ae13-753e2723d097",
  type: "page-type/world-spell",
  slug: "lava-rain",
  title: "Lava Rain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
