import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const tyrant = {
  id: "01a06586-0a6e-78b7-aaa7-3d995e6fd77a",
  type: "world-class",
  slug: "tyrant",
  title: "Tyrant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
