import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const woodworker = {
  id: "01a06586-0a83-7afa-a3f0-74c316a7dc28",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "woodworker",
  title: "Woodworker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
