import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mightyCleaving = {
  id: "01a06572-95d9-777a-9549-ba611f573986",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mighty-cleaving",
  title: "Mighty Cleaving",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
