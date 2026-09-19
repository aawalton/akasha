import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodearthMage = {
  id: "01a0657e-01be-7383-9b7b-6308da118c4d",
  type: "page-type/world-class",
  slug: "bloodearth-mage",
  title: "Bloodearth Mage",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["green-mage"],
  references: "jsonl",
} as const satisfies WorldClass
