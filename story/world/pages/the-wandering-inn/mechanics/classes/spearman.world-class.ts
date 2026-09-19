import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearman = {
  id: "01a0657e-025d-7cc5-8742-01261cc16455",
  type: "page-type/world-class",
  slug: "spearman",
  title: "Spearman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
