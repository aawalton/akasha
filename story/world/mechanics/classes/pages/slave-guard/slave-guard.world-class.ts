import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveGuard = {
  id: "01a06586-0a3f-7bb4-98d0-3c22e650460e",
  type: "page-type/world-class",
  slug: "slave-guard",
  title: "Slave Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
