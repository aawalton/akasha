import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deathOrbs = {
  id: "01a06572-95bb-76af-89f4-9ac09cd86a24",
  type: "world-spell",
  slug: "death-orbs",
  title: "Death Orbs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
