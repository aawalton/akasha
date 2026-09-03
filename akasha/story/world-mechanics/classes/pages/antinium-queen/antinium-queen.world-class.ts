import type { WorldClass } from "../../world-class.page-type.ts"

export const antiniumQueen = {
  id: "01a0657e-01a8-77f4-aab1-bcde45aeed15",
  pageTypeSlug: "world-class",
  slug: "antinium-queen",
  title: "Antinium Queen",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["queen"],
  evolvesToSlugs: ["queen-of-freedom"],
  references: "jsonl",
} as const satisfies WorldClass
