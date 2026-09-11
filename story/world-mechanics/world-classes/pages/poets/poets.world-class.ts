import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const poets = {
  id: "01a06586-0a0a-79ef-a8aa-62a44c3d69d7",
  type: "world-class",
  slug: "poets",
  title: "Poets",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
