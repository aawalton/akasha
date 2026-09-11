import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sergeant = {
  id: "01a06586-0a30-73ce-9425-8944f2d407cb",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sergeant",
  title: "Sergeant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
