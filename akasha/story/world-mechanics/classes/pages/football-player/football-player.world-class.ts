import type { WorldClass } from "../../world-class.page-type.ts"

export const footballPlayer = {
  id: "01a0657e-01de-73f4-afcd-6642a4047bc1",
  pageTypeSlug: "world-class",
  slug: "football-player",
  title: "Football Player",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["kicker"],
  references: "jsonl",
} as const satisfies WorldClass
