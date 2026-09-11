import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const empoweredMinion = {
  id: "01a06572-95bf-74c1-8265-e9fbd72322f4",
  type: "world-spell",
  slug: "empowered-minion",
  title: "Empowered Minion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
