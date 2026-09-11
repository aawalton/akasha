import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const prospector = {
  id: "01a06586-0a19-7397-a4eb-21d5ad8b646c",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "prospector",
  title: "Prospector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
