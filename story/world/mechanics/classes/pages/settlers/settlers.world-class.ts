import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const settlers = {
  id: "01a0657e-024d-7f4e-903e-6186b731dcf7",
  type: "page-type/world-class",
  slug: "settlers",
  title: "Settlers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
