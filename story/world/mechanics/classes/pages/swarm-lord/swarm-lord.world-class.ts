import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swarmLord = {
  id: "01a06586-0a60-79ae-92d3-a79760b44d79",
  type: "page-type/world-class",
  slug: "swarm-lord",
  title: "Swarm Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
