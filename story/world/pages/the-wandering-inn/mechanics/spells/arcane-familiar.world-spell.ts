import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneFamiliar = {
  id: "01a06572-95b4-72e8-8ff7-9a461a9b5a6d",
  type: "page-type/world-spell",
  slug: "arcane-familiar",
  title: "Arcane Familiar",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
