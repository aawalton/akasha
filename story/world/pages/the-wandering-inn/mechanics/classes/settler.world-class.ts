import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const settler = {
  id: "01a06586-0a32-7db9-8d26-063a5019eae8",
  type: "page-type/world-class",
  slug: "settler",
  title: "Settler",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.386Z",
  updatedAt: "2026-09-22T13:29:59.000Z",
} as const satisfies WorldClass
