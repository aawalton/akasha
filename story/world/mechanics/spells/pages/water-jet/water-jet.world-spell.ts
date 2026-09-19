import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterJet = {
  id: "01a06572-95e9-7aea-b02e-4917d84ed567",
  type: "page-type/world-spell",
  slug: "water-jet",
  title: "Water Jet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
