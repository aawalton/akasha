import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const piercingMissiles = {
  id: "01a06572-95da-7c20-89c6-e7800f830e16",
  type: "world-spell",
  slug: "piercing-missiles",
  title: "Piercing Missiles",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
