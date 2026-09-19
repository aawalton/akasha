import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const taskmaster = {
  id: "01a0657e-0269-711c-9df5-c756251d9e62",
  type: "page-type/world-class",
  slug: "taskmaster",
  title: "Taskmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
