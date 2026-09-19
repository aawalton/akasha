import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const reporter = {
  id: "01a06586-0a21-73e2-93a5-b4710e40864d",
  type: "page-type/world-class",
  slug: "reporter",
  title: "Reporter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
