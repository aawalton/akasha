import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectInsect = {
  id: "01a06572-95bc-7d5c-8bc1-63458ae202af",
  type: "page-type/world-spell",
  slug: "detect-insect",
  title: "Detect Insect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
