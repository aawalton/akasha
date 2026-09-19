import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boltsOfPain = {
  id: "01a06572-95b7-7ed6-87f7-35279f8b65a0",
  type: "page-type/world-spell",
  slug: "bolts-of-pain",
  title: "Bolts of Pain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
