import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfTheWinds = {
  id: "01a06572-95e9-718a-a7a6-d3d62246ce5c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wall-of-the-winds",
  title: "Wall of the Winds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
