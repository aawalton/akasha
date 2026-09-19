import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const trueEarthquake = {
  id: "01a06572-95e7-71f2-9bdc-3b3ac1116de6",
  type: "page-type/world-spell",
  slug: "true-earthquake",
  title: "True Earthquake",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
