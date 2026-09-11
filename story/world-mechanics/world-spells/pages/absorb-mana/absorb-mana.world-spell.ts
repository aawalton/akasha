import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const absorbMana = {
  id: "01a06572-95b2-76db-ab31-82619296b32c",
  type: "world-spell",
  slug: "absorb-mana",
  title: "Absorb Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
