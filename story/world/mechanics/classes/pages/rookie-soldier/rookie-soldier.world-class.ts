import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rookieSoldier = {
  id: "01a06586-0a25-7887-8350-de5c7d9bf973",
  type: "page-type/world-class",
  slug: "rookie-soldier",
  title: "Rookie Soldier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
