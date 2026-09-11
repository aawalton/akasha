import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const briskBreeze = {
  id: "01a06572-95b7-730e-83ad-19c062900b9c",
  type: "world-spell",
  slug: "brisk-breeze",
  title: "Brisk Breeze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
