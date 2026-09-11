import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const tourGuide = {
  id: "01a06586-0a68-7e57-885a-539096a41239",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "tour-guide",
  title: "Tour Guide",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
