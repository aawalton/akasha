import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfIce = {
  id: "01a06572-95e9-7ef7-822b-37d69cc3996e",
  type: "world-spell",
  slug: "wall-of-ice",
  title: "Wall of Ice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
