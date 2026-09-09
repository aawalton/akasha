import type { WorldSpell } from "../../world-spell.page-type.ts"

export const shapeEarth = {
  id: "01a06572-95df-7494-a6fa-40af0f8ead41",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shape-earth",
  title: "Shape Earth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
