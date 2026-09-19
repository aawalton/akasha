import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sweepers = {
  id: "01a06586-0a60-7bcc-83b3-a6163f13d272",
  type: "page-type/world-class",
  slug: "sweepers",
  title: "Sweepers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
