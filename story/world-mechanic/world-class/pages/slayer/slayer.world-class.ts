import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const slayer = {
  id: "01a06586-0a43-734d-ad11-fb235a84515b",
  type: "world-class",
  slug: "slayer",
  title: "Slayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
