import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const antiniumQueen = {
  id: "01a0657e-01a8-77f4-aab1-bcde45aeed15",
  type: "page-type/world-class",
  slug: "antinium-queen",
  title: "Antinium Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/queen"],
  evolvesToSlugs: ["world-class/queen-of-freedom"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.912Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
