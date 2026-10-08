import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const armorOfThorns = {
  id: "01a06572-95b4-7df7-a088-adc00215ce3a",
  type: "page-type/world-spell",
  slug: "armor-of-thorns",
  title: "Armor of Thorns",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
