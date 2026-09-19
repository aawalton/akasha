import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const riders = {
  id: "01a06586-0a23-750b-81fd-90543097df87",
  type: "page-type/world-class",
  slug: "riders",
  title: "Riders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
