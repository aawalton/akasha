import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterColossusGrasp = {
  id: "01a06572-95e9-72bd-8bbf-366ca93d3f69",
  type: "page-type/world-spell",
  slug: "water-colossus-grasp",
  title: "Water Colossus’ Grasp",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
