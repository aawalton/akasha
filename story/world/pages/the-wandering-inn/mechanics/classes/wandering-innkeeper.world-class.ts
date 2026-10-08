import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wanderingInnkeeper = {
  id: "01a06586-0a71-7e8b-b872-7cf502167e7d",
  type: "page-type/world-class",
  slug: "wandering-innkeeper",
  title: "Wandering Innkeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.449Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
