import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const charm = {
  id: "01a06572-95b8-77f9-9224-3f4c93457259",
  type: "world-spell",
  slug: "charm",
  title: "Charm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
