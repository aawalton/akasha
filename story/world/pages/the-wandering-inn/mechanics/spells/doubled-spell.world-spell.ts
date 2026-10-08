import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const doubledSpell = {
  id: "01a06572-95be-7c78-9177-dea6aa1dabfe",
  type: "page-type/world-spell",
  slug: "doubled-spell",
  title: "Doubled Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
