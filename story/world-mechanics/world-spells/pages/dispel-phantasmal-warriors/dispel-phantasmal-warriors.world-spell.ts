import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dispelPhantasmalWarriors = {
  id: "01a06572-95be-716f-8f6c-fc60706c698f",
  type: "world-spell",
  slug: "dispel-phantasmal-warriors",
  title: "Dispel Phantasmal Warriors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
