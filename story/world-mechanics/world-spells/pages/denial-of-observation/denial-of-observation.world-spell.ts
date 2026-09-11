import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const denialOfObservation = {
  id: "01a06572-95bc-72ec-b20e-d8e7d3a8a5f1",
  type: "world-spell",
  slug: "denial-of-observation",
  title: "Denial of Observation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
