import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massArmorOfThorns = {
  id: "01a06572-95d1-7ff8-acd7-edeeb7ee1e98",
  type: "page-type/world-spell",
  slug: "mass-armor-of-thorns",
  title: "Mass Armor of Thorns",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
