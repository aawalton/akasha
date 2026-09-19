import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const runeshaper = {
  id: "01a06586-0a27-72bb-86c7-b72a7b33f571",
  type: "page-type/world-class",
  slug: "runeshaper",
  title: "Runeshaper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
