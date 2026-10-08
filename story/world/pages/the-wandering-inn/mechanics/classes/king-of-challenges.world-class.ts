import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingOfChallenges = {
  id: "01a0657e-1378-71d1-8044-6eb7c4f0f7d5",
  type: "page-type/world-class",
  slug: "king-of-challenges",
  title: "King of Challenges",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  evolvesFromSlugs: ["world-class/king"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.472Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
