import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandLightningTidalWave = {
  id: "01a06572-95c6-731c-b590-6cc27ae19b79",
  type: "page-type/world-spell",
  slug: "grand-lightning-tidal-wave",
  title: "Grand Lightning Tidal Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
