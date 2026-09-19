import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const museumCurator = {
  id: "01a0657e-0234-7dbe-a799-a6f508cd61ad",
  type: "page-type/world-class",
  slug: "museum-curator",
  title: "Museum Curator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
