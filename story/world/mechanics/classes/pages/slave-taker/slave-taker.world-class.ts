import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveTaker = {
  id: "01a0657e-0257-7ee3-8189-02c20c85a1e2",
  type: "page-type/world-class",
  slug: "slave-taker",
  title: "Slave Taker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
