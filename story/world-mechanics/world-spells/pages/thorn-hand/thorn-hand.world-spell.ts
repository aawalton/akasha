import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thornHand = {
  id: "01a06572-95e6-79a0-8529-b037cce8a292",
  type: "world-spell",
  slug: "thorn-hand",
  title: "Thorn Hand",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
