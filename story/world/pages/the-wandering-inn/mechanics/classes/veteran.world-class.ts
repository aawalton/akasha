import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteran = {
  id: "01a06586-0a6f-73ac-85fc-8faadd116f98",
  type: "page-type/world-class",
  slug: "veteran",
  title: "Veteran",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
