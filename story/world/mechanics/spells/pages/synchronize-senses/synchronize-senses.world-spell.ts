import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const synchronizeSenses = {
  id: "01a06572-95e5-70a1-996d-4c2d04e0b8c2",
  type: "page-type/world-spell",
  slug: "synchronize-senses",
  title: "Synchronize Senses",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
