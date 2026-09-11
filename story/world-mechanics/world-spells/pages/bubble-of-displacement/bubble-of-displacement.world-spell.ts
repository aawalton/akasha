import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bubbleOfDisplacement = {
  id: "01a06572-95b7-79b0-b824-4e466fbad66d",
  type: "world-spell",
  slug: "bubble-of-displacement",
  title: "Bubble of Displacement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
