import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scavengers = {
  id: "01a06586-0a2a-7d6c-9acb-bf6f6a788e2f",
  type: "page-type/world-class",
  slug: "scavengers",
  title: "Scavengers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
