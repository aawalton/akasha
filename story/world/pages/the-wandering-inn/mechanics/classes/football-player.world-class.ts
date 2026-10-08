import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footballPlayer = {
  id: "01a0657e-01de-73f4-afcd-6642a4047bc1",
  type: "page-type/world-class",
  slug: "football-player",
  title: "Football Player",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/kicker"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.966Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
