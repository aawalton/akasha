import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateKings = {
  id: "01a06586-0a07-7786-8d78-03b791463eb5",
  type: "page-type/world-class",
  slug: "pirate-kings",
  title: "Pirate Kings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
