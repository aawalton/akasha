import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spinner = {
  id: "01a06586-0a51-7ddb-9e52-a4b11da6f843",
  type: "page-type/world-class",
  slug: "spinner",
  title: "Spinner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
