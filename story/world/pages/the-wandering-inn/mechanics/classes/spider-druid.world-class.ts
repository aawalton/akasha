import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spiderDruid = {
  id: "01a06586-0a50-7ac9-8008-d4520c947956",
  type: "page-type/world-class",
  slug: "spider-druid",
  title: "Spider Druid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
