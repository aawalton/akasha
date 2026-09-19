import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slimeMaster = {
  id: "01a06586-0a43-77f1-a425-e5de511bf3a5",
  type: "page-type/world-class",
  slug: "slime-master",
  title: "Slime Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
