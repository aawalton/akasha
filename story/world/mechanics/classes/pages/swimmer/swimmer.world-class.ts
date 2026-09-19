import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swimmer = {
  id: "01a06586-0a60-76df-9a97-46ea4de18e88",
  type: "page-type/world-class",
  slug: "swimmer",
  title: "Swimmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
