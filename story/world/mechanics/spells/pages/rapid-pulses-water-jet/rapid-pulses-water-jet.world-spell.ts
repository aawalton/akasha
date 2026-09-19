import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rapidPulsesWaterJet = {
  id: "01a06572-95dc-7d97-ac6e-809bda1b75cb",
  type: "page-type/world-spell",
  slug: "rapid-pulses-water-jet",
  title: "Rapid Pulses – Water Jet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
