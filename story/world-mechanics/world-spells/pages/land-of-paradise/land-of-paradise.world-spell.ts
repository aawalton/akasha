import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const landOfParadise = {
  id: "01a06572-95cc-7e2c-ab03-7e5be77c4ffc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "land-of-paradise",
  title: "Land of Paradise",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
