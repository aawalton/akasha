import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pikeman = {
  id: "01a06586-0a06-74e0-a512-c10d68e86b35",
  type: "page-type/world-class",
  slug: "pikeman",
  title: "Pikeman",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.342Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
