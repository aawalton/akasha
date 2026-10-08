import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetBrawler = {
  id: "01a06586-0a5d-7d3e-b0d9-5d2c67bc4dad",
  type: "page-type/world-class",
  slug: "street-brawler",
  title: "Street Brawler",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.429Z",
  updatedAt: "2026-09-22T13:30:14.000Z",
} as const satisfies WorldClass
