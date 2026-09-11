import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const tidalWaveAcid = {
  id: "01a06572-95e7-70ad-b70b-ca212089f3a4",
  type: "world-spell",
  slug: "tidal-wave-acid",
  title: "Tidal Wave: Acid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
