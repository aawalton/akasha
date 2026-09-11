import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjureTidalWave = {
  id: "01a06572-95ba-7b33-92cc-40d3fac94106",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "conjure-tidal-wave",
  title: "Conjure Tidal Wave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
