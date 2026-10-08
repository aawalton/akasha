import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stormKeep = {
  id: "01a06572-95e4-7030-9ed1-858749c410fd",
  type: "page-type/world-spell",
  slug: "storm-keep",
  title: "Storm Keep",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
