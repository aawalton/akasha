import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farmLady = {
  id: "01a0657e-01da-71be-9e05-d63154167ff6",
  type: "page-type/world-class",
  slug: "farm-lady",
  title: "Farm Lady",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/farmer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.962Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
