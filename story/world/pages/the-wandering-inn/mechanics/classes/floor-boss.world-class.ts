import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const floorBoss = {
  id: "01a0657e-01dd-7921-98c3-f7408effff8e",
  type: "page-type/world-class",
  slug: "floor-boss",
  title: "Floor Boss",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.965Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
