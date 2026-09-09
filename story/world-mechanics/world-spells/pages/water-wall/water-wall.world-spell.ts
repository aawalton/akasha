import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterWall = {
  id: "01a06572-95e9-7db0-a03a-ac855823f6a1",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "water-wall",
  title: "Water Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
