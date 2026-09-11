import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterPiercesAllBarriers = {
  id: "01a06572-95e9-7297-b76c-760c81f78984",
  type: "world-spell",
  slug: "water-pierces-all-barriers",
  title: "Water Pierces All Barriers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
