import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetFighter = {
  id: "01a06586-0a5d-7b80-b50c-7a7b9a2229e6",
  type: "page-type/world-class",
  slug: "street-fighter",
  title: "Street Fighter",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.429Z",
  updatedAt: "2026-09-22T13:30:14.000Z",
} as const satisfies WorldClass
