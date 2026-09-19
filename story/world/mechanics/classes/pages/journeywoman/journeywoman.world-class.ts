import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const journeywoman = {
  id: "01a0657e-1378-79e9-ad9e-277a0e3ef47f",
  type: "page-type/world-class",
  slug: "journeywoman",
  title: "Journeywoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
