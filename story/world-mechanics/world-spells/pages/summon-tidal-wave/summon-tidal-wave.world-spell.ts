import type { WorldSpell } from "../../world-spell.page-type.ts"

export const summonTidalWave = {
  id: "01a06572-95e4-7e0d-8d7b-a25a87056a32",
  pageTypeSlug: "world-spell",
  slug: "summon-tidal-wave",
  title: "Summon Tidal Wave",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
