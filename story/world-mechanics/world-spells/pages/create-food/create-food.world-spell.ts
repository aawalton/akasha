import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createFood = {
  id: "01a06572-95bb-7a3b-ac23-ca8aaaa0d337",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "create-food",
  title: "Create Food",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
