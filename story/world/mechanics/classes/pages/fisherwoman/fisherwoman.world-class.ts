import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fisherwoman = {
  id: "01a0657e-01dc-71a9-bcbb-daaaabfca653",
  type: "page-type/world-class",
  slug: "fisherwoman",
  title: "Fisherwoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
