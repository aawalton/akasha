import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const salesperson = {
  id: "01a0657e-024a-7a11-8ddf-6f59841093d3",
  type: "page-type/world-class",
  slug: "salesperson",
  title: "Salesperson",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
