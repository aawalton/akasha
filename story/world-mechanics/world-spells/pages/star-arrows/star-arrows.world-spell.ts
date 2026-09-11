import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const starArrows = {
  id: "01a06572-95e2-7d1d-9ac3-cb4fa6d9a3d3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "star-arrows",
  title: "Star Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
