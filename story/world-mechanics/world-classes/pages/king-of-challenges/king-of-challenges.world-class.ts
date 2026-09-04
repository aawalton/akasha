import type { WorldClass } from "../../world-class.page-type.ts"

export const kingOfChallenges = {
  id: "01a0657e-1378-71d1-8044-6eb7c4f0f7d5",
  pageTypeSlug: "world-class",
  slug: "king-of-challenges",
  title: "King of Challenges",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["king"],
  references: "jsonl",
} as const satisfies WorldClass
