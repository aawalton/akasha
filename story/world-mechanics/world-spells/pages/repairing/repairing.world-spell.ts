import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const repairing = {
  id: "01a06572-95dd-7211-94c5-74d8e8fcbc76",
  type: "world-spell",
  slug: "repairing",
  title: "Repairing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
