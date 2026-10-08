import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcaneFamiliars = {
  id: "01a06572-95b4-7342-8ae5-5bb4e1724ca9",
  type: "page-type/world-spell",
  slug: "arcane-familiars",
  title: "Arcane Familiars",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
