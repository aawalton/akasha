import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashRain = {
  id: "01a06572-95c3-74cb-a853-67d73bde965c",
  type: "page-type/world-spell",
  slug: "flash-rain",
  title: "Flash Rain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
