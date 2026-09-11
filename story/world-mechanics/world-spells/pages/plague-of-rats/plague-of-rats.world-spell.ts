import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const plagueOfRats = {
  id: "01a06572-95db-7f2a-810c-677f57cc6195",
  type: "world-spell",
  slug: "plague-of-rats",
  title: "Plague of Rats",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
