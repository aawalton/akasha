import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonTidalWave = {
  id: "01a06572-95e4-7e0d-8d7b-a25a87056a32",
  type: "world-spell",
  slug: "summon-tidal-wave",
  title: "Summon Tidal Wave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
