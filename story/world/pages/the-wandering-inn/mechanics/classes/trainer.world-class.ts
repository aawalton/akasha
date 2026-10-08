import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trainer = {
  id: "01a06586-0a6a-72ed-90a2-d1c10c7aa057",
  type: "page-type/world-class",
  slug: "trainer",
  title: "Trainer",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.442Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
