import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shootlingFarmer = {
  id: "01a06586-0a3b-74a8-96d1-5a9f6a4b2934",
  type: "page-type/world-class",
  slug: "shootling-farmer",
  title: "Shootling Farmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
