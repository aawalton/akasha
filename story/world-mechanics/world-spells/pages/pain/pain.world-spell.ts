import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pain = {
  id: "01a06572-95da-7185-bfa4-6c8ae124afdd",
  type: "world-spell",
  slug: "pain",
  title: "Pain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
