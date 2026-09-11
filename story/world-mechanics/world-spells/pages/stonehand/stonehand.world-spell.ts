import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stonehand = {
  id: "01a06572-95e4-74c1-af92-8b74caeac75d",
  type: "world-spell",
  slug: "stonehand",
  title: "Stonehand",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
