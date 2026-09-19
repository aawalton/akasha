import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const runecrafters = {
  id: "01a06586-0a27-77b1-9cbd-420d7ab5fc72",
  type: "page-type/world-class",
  slug: "runecrafters",
  title: "Runecrafters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
