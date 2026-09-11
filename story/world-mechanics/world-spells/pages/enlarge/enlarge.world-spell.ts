import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const enlarge = {
  id: "01a06572-95bf-7659-9e8a-674a52f54608",
  type: "world-spell",
  slug: "enlarge",
  title: "Enlarge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
