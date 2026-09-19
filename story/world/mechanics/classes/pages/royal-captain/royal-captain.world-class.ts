import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalCaptain = {
  id: "01a06586-0a26-7827-905f-883c231569d6",
  type: "page-type/world-class",
  slug: "royal-captain",
  title: "Royal Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
