import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonTheThrone = {
  id: "01a06572-95e4-7d0f-b154-9ed947767582",
  type: "page-type/world-spell",
  slug: "summon-the-throne",
  title: "Summon the Throne",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
