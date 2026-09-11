import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaDisruption = {
  id: "01a06572-95d1-7e11-b02c-c9d5154c4275",
  type: "world-spell",
  slug: "mana-disruption",
  title: "Mana Disruption",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
