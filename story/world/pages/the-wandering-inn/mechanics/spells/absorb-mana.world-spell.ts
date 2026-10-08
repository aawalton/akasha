import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const absorbMana = {
  id: "01a06572-95b2-76db-ab31-82619296b32c",
  type: "page-type/world-spell",
  slug: "absorb-mana",
  title: "Absorb Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.378Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
