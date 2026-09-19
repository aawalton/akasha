import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveMaster = {
  id: "01a06586-0a3f-76c1-a362-c800ae6f0bc0",
  type: "page-type/world-class",
  slug: "slave-master",
  title: "Slave Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
