import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const primeMinisters = {
  id: "01a06586-0a0c-77a6-9b9b-c3d1fcdef521",
  type: "page-type/world-class",
  slug: "prime-ministers",
  title: "Prime Ministers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
