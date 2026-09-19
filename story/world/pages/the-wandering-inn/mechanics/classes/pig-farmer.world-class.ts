import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pigFarmer = {
  id: "01a06586-0a06-70b8-9b59-cbf9cd6fb676",
  type: "page-type/world-class",
  slug: "pig-farmer",
  title: "Pig Farmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
