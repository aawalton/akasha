import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const petrification = {
  id: "01a06572-95da-7c34-a170-cce58c15c014",
  type: "world-spell",
  slug: "petrification",
  title: "Petrification",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
