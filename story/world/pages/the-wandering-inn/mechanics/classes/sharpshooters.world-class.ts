import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sharpshooters = {
  id: "01a06586-0a3a-706e-a80a-b1a1bfa6ff77",
  type: "page-type/world-class",
  slug: "sharpshooters",
  title: "Sharpshooters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
