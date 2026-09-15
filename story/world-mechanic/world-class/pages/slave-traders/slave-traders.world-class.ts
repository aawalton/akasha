import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const slaveTraders = {
  id: "01a06586-0a3f-759c-8cec-4818256e4933",
  type: "world-class",
  slug: "slave-traders",
  title: "Slave Traders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
