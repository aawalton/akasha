import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const skiier = {
  id: "01a06586-0a3e-79b4-8dc8-2d390deacd39",
  type: "world-class",
  slug: "skiier",
  title: "Skiier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
