import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const supplyChainMaster = {
  id: "01a06586-0a5f-76a7-a8ac-38d4e83d5c05",
  type: "page-type/world-class",
  slug: "supply-chain-master",
  title: "Supply Chain Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
