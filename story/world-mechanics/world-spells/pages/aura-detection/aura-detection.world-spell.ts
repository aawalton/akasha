import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const auraDetection = {
  id: "01a06572-95b5-7cf5-85c1-0b62266646c8",
  type: "world-spell",
  slug: "aura-detection",
  title: "Aura Detection",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
