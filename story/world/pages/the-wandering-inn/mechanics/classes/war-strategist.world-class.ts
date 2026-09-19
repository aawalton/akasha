import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warStrategist = {
  id: "01a06586-0a71-7625-9d59-e4a63fafae17",
  type: "page-type/world-class",
  slug: "war-strategist",
  title: "War Strategist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
