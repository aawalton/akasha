import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const worldRenownedCoach = {
  id: "01a0657e-0272-73ed-bc0f-0de46f58296d",
  type: "page-type/world-class",
  slug: "world-renowned-coach",
  title: "World-Renowned Coach",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/famed-coach"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.114Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
