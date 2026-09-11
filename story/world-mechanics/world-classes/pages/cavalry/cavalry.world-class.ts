import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const cavalry = {
  id: "01a0657e-01c3-7a09-b003-605002dacd62",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "cavalry",
  title: "Cavalry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
