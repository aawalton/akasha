import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const briskBreeze = {
  id: "01a06572-95b7-730e-83ad-19c062900b9c",
  type: "page-type/world-spell",
  slug: "brisk-breeze",
  title: "Brisk Breeze",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
