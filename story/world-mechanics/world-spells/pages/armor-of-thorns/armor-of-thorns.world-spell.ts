import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const armorOfThorns = {
  id: "01a06572-95b4-7df7-a088-adc00215ce3a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "armor-of-thorns",
  title: "Armor of Thorns",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
