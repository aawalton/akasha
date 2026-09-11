import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const rebels = {
  id: "01a06586-0a1e-78a4-a7cd-36a508503dad",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "rebels",
  title: "Rebels",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
