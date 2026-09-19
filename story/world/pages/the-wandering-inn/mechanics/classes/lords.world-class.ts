import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lords = {
  id: "01a0657e-1391-7063-bee1-73afcebacbcc",
  type: "page-type/world-class",
  slug: "lords",
  title: "Lords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
