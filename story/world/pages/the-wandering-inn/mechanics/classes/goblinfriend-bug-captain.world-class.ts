import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinfriendBugCaptain = {
  id: "01a0657e-01e2-7c67-b7a0-51972ccd4e14",
  type: "page-type/world-class",
  slug: "goblinfriend-bug-captain",
  title: "Goblinfriend Bug-Captain",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/tracking-sergeant"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.970Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
