import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crystalHealer = {
  id: "01a0657e-1351-7574-8720-89f7017143e7",
  type: "page-type/world-class",
  slug: "crystal-healer",
  title: "Crystal Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
