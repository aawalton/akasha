import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaOrb = {
  id: "01a06572-95d1-712f-bfdd-a58f648b5a72",
  type: "page-type/world-spell",
  slug: "mana-orb",
  title: "Mana Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
