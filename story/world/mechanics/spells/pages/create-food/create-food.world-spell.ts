import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createFood = {
  id: "01a06572-95bb-7a3b-ac23-ca8aaaa0d337",
  type: "page-type/world-spell",
  slug: "create-food",
  title: "Create Food",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
