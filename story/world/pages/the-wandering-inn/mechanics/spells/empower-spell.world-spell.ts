import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const empowerSpell = {
  id: "01a06572-95bf-7c51-a296-cf866716debb",
  type: "page-type/world-spell",
  slug: "empower-spell",
  title: "Empower Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
