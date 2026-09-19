import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveLord = {
  id: "01a06586-0a3f-7cd4-aaaa-c7451b949463",
  type: "page-type/world-class",
  slug: "slave-lord",
  title: "Slave Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
