import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonLesserFrostElemental = {
  id: "01a06572-95e4-750a-8a51-5f0f8a32e68a",
  type: "page-type/world-spell",
  slug: "summon-lesser-frost-elemental",
  title: "Summon Lesser Frost Elemental",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
