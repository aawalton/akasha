import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const grouch = {
  id: "01a0657e-01e5-75a2-bfb3-c06fd56aad5b",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "grouch",
  title: "Grouch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
