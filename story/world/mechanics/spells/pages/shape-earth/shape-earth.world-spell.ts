import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shapeEarth = {
  id: "01a06572-95df-7494-a6fa-40af0f8ead41",
  type: "page-type/world-spell",
  slug: "shape-earth",
  title: "Shape Earth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
