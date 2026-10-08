import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const undSpellQuake = {
  id: "01a06572-95e7-7581-8463-6a02af5e3ee5",
  type: "page-type/world-spell",
  slug: "und-spell-quake",
  title: "—und Spell: Quake",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
