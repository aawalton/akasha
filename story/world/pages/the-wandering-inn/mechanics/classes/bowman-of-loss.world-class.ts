import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bowmanOfLoss = {
  id: "01a0657e-01c0-7ee9-8fe1-0f13ae466031",
  type: "page-type/world-class",
  slug: "bowman-of-loss",
  title: "Bowman of Loss",
  world: "world/the-wandering-inn",
  appearanceCount: 17,
  evolvesFromSlugs: ["world-class/veteran-scout"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.936Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
