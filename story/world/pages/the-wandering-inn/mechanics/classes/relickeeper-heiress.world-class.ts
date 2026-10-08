import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const relickeeperHeiress = {
  id: "01a0657e-0245-774d-886d-cf1b60ece5fa",
  type: "page-type/world-class",
  slug: "relickeeper-heiress",
  title: "Relickeeper Heiress",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/heiress"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.069Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
