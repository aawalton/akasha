import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rogues = {
  id: "01a06586-0a25-7f3d-8d19-f434bf4362ce",
  type: "page-type/world-class",
  slug: "rogues",
  title: "Rogues",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
