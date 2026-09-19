import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const washer = {
  id: "01a06586-0a75-75e6-8ae3-dc1bb46b295a",
  type: "page-type/world-class",
  slug: "washer",
  title: "Washer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
