import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const philosopher = {
  id: "01a06586-0a06-7742-8731-f4131305afd3",
  type: "page-type/world-class",
  slug: "philosopher",
  title: "Philosopher",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.342Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
