import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const journeymanAlchemist = {
  id: "01a0657e-1377-761d-9351-a8b88270adc2",
  type: "page-type/world-class",
  slug: "journeyman-alchemist",
  title: "Journeyman Alchemist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
