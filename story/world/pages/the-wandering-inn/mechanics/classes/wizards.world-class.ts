import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wizards = {
  id: "01a06586-0a83-7e34-a5c8-cc407ab0c25e",
  type: "page-type/world-class",
  slug: "wizards",
  title: "Wizards",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.467Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
