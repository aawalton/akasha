import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swarmMage = {
  id: "01a0657e-0262-73ed-b1a8-4cf87d237d9d",
  type: "page-type/world-class",
  slug: "swarm-mage",
  title: "Swarm Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
