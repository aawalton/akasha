import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const famedCoach = {
  id: "01a0657e-01da-7135-9642-ebb75893ae42",
  type: "page-type/world-class",
  slug: "famed-coach",
  title: "Famed Coach",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/coach"],
  evolvesToSlugs: ["world-class/world-renowned-coach"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.962Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
