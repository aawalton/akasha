import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shepherd = {
  id: "01a06586-0a3a-7d48-85b3-4ef3007492a7",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shepherd",
  title: "Shepherd",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
