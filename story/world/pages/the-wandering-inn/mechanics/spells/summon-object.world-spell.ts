import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonObject = {
  id: "01a06572-95e4-7e7c-a0a9-450a7d70d6ce",
  type: "page-type/world-spell",
  slug: "summon-object",
  title: "Summon Object",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
