import type { WorldClass } from "../../world-class.page-type.ts"

export const worldRenownedCoach = {
  id: "01a0657e-0272-73ed-bc0f-0de46f58296d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "world-renowned-coach",
  title: "World-Renowned Coach",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["famed-coach"],
  references: "jsonl",
} as const satisfies WorldClass
