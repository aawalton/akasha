import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const amazingLiar = {
  id: "01a0657e-01a7-7968-ae27-b11a29834c7e",
  type: "page-type/world-class",
  slug: "amazing-liar",
  title: "Amazing Liar",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/liar"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.911Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
