import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonDarkFamiliars = {
  id: "01a06572-95e4-75c1-b6d3-e11b2f91a164",
  type: "page-type/world-spell",
  slug: "summon-dark-familiars",
  title: "Summon Dark Familiars",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
