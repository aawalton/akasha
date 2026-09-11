import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const forceshield = {
  id: "01a06572-95c5-705a-8c03-332e74d80e50",
  type: "world-spell",
  slug: "forceshield",
  title: "Forceshield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
