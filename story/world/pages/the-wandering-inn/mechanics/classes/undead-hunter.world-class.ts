import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const undeadHunter = {
  id: "01a06586-0a6e-761b-b43d-dd5c332dd196",
  type: "page-type/world-class",
  slug: "undead-hunter",
  title: "Undead Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
