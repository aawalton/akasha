import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const expeditionLeader = {
  id: "01a0657e-01d9-74d2-a13f-b5d88331bb3b",
  type: "page-type/world-class",
  slug: "expedition-leader",
  title: "Expedition Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
