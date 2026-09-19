import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wordOfDeath = {
  id: "01a06572-95ea-7861-85e8-d8d61bb9ce07",
  type: "page-type/world-spell",
  slug: "word-of-death",
  title: "Word of Death",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
