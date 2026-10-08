import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterColossusGrasp = {
  id: "01a06572-95e9-72bd-8bbf-366ca93d3f69",
  type: "page-type/world-spell",
  slug: "water-colossus-grasp",
  title: "Water Colossus’ Grasp",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
