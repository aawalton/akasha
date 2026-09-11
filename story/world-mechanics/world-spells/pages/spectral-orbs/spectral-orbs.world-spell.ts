import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spectralOrbs = {
  id: "01a06572-95e2-79ef-9457-7c71a9805e50",
  type: "world-spell",
  slug: "spectral-orbs",
  title: "Spectral Orbs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
