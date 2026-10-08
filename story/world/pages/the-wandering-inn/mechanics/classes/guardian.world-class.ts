import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guardian = {
  id: "01a0657e-01e7-78fa-a91f-bac3552e4dd3",
  type: "page-type/world-class",
  slug: "guardian",
  title: "Guardian",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  evolvesToSlugs: ["world-class/skeleton-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.975Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
