import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodearthMage = {
  id: "01a0657e-01be-7383-9b7b-6308da118c4d",
  type: "page-type/world-class",
  slug: "bloodearth-mage",
  title: "Bloodearth Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/green-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.934Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
