import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveOwners = {
  id: "01a06586-0a3f-7a77-bc00-94b6b49f4587",
  type: "page-type/world-class",
  slug: "slave-owners",
  title: "Slave Owners",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
