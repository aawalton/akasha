import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterArrows = {
  id: "01a06572-95e9-7c7c-8d51-011727de012f",
  type: "page-type/world-spell",
  slug: "water-arrows",
  title: "Water Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
