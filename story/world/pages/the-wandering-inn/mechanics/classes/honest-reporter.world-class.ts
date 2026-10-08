import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const honestReporter = {
  id: "01a0657e-01f9-73fa-a6dc-f54fb7717760",
  type: "page-type/world-class",
  slug: "honest-reporter",
  title: "Honest Reporter",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  evolvesFromSlugs: ["world-class/gossip"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.993Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
