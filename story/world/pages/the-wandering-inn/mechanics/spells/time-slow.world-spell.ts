import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const timeSlow = {
  id: "01a06572-95e7-72fa-9d7f-cb794f82a9c3",
  type: "page-type/world-spell",
  slug: "time-slow",
  title: "Time Slow",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
