import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pilgrims = {
  id: "01a06586-0a06-7c18-9412-f9bc07ea1239",
  type: "page-type/world-class",
  slug: "pilgrims",
  title: "Pilgrims",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
