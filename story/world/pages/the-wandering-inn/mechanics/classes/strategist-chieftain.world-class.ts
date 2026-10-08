import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strategistChieftain = {
  id: "01a06586-0a56-7679-acd1-83efbb32b5f1",
  type: "page-type/world-class",
  slug: "strategist-chieftain",
  title: "Strategist Chieftain",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/strategist-chieftain-of-reclamation"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.422Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
