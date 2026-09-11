import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfBlades = {
  id: "01a06572-95e8-7e12-ae6a-517208d91cfd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wall-of-blades",
  title: "Wall of Blades",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
