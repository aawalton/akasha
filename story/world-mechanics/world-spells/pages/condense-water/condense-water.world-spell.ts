import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const condenseWater = {
  id: "01a06572-95b9-7dc6-8884-53aee1214be0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "condense-water",
  title: "Condense Water",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
