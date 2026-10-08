import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eleleuStrategos = {
  id: "01a0657e-1359-7cc4-b969-cf6ded29585d",
  type: "page-type/world-class",
  slug: "eleleu-strategos",
  title: "Eleleu Strategos",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/strategist"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.441Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
