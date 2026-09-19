import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaOrb = {
  id: "01a06572-95d1-712f-bfdd-a58f648b5a72",
  type: "page-type/world-spell",
  slug: "mana-orb",
  title: "Mana Orb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
