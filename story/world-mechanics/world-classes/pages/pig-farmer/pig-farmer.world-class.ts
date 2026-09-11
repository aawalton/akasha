import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const pigFarmer = {
  id: "01a06586-0a06-70b8-9b59-cbf9cd6fb676",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "pig-farmer",
  title: "Pig Farmer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
