import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cleanse = {
  id: "01a06572-95b9-77be-81df-cba07859bdf5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "cleanse",
  title: "Cleanse",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
