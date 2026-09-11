import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boltOfSpite = {
  id: "01a06572-95b6-7787-b6b8-ade55a8e8ff9",
  type: "world-spell",
  slug: "bolt-of-spite",
  title: "Bolt of Spite",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
