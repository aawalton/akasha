import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const antiniumQueen = {
  id: "01a0657e-01a8-77f4-aab1-bcde45aeed15",
  type: "world-class",
  slug: "antinium-queen",
  title: "Antinium Queen",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["queen"],
  evolvesToSlugs: ["queen-of-freedom"],
  references: "jsonl",
} as const satisfies WorldClass
