import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bannerlady = {
  id: "01a0657e-01b0-7679-b240-ff65140f621b",
  type: "page-type/world-class",
  slug: "bannerlady",
  title: "Bannerlady",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  evolvesFromSlugs: ["world-class/warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.920Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
