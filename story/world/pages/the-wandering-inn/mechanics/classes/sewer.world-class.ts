import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sewer = {
  id: "01a06586-0a32-7fbf-bf79-b8348553b054",
  type: "page-type/world-class",
  slug: "sewer",
  title: "Sewer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
