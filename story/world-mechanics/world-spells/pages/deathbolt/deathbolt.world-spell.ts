import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deathbolt = {
  id: "01a06572-95bc-733b-9782-3852e3818a84",
  type: "world-spell",
  slug: "deathbolt",
  title: "Deathbolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
