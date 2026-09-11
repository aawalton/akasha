import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const tremorImpact = {
  id: "01a06572-95e7-789b-a2ed-fc0f80589ea7",
  type: "world-spell",
  slug: "tremor-impact",
  title: "Tremor Impact",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
