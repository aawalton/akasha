import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spiderweb = {
  id: "01a06572-95e2-7d10-b6ac-7bdd2ad3a98a",
  type: "page-type/world-spell",
  slug: "spiderweb",
  title: "Spiderweb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
