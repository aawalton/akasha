import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const artisans = {
  id: "01a0657e-1331-772e-bfe3-e9e4d58b60a7",
  type: "world-class",
  slug: "artisans",
  title: "Artisans",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
