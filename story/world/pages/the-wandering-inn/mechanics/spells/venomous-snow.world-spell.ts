import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const venomousSnow = {
  id: "01a06572-95e8-7d75-b622-7bd4ca1c31e8",
  type: "page-type/world-spell",
  slug: "venomous-snow",
  title: "Venomous Snow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
