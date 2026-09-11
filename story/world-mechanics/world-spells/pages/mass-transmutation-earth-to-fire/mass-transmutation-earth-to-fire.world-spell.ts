import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massTransmutationEarthToFire = {
  id: "01a06572-95d2-7a56-b6cb-e8467737e9b7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mass-transmutation-earth-to-fire",
  title: "Mass Transmutation: Earth to Fire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
