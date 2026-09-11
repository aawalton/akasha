import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const ruler = {
  id: "01a06586-0a27-7712-b5e5-54c225597026",
  type: "world-class",
  slug: "ruler",
  title: "Ruler",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
