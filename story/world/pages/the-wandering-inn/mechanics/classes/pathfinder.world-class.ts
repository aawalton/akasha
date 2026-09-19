import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pathfinder = {
  id: "01a0657e-0236-792c-9da6-ab94701ceb9c",
  type: "page-type/world-class",
  slug: "pathfinder",
  title: "Pathfinder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
