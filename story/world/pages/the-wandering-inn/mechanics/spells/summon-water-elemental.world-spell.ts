import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonWaterElemental = {
  id: "01a06572-95e4-760e-a895-90ff274c29eb",
  type: "page-type/world-spell",
  slug: "summon-water-elemental",
  title: "Summon Water Elemental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
