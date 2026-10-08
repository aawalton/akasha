import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rookieSoldier = {
  id: "01a06586-0a25-7887-8350-de5c7d9bf973",
  type: "page-type/world-class",
  slug: "rookie-soldier",
  title: "Rookie Soldier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.373Z",
  updatedAt: "2026-09-22T13:29:51.000Z",
} as const satisfies WorldClass
