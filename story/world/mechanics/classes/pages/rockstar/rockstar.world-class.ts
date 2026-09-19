import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rockstar = {
  id: "01a06586-0a23-786d-92bd-edcc43dd0f0d",
  type: "page-type/world-class",
  slug: "rockstar",
  title: "Rockstar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
