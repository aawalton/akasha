import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const senators = {
  id: "01a06586-0a2f-728d-892f-80f96b0ed177",
  type: "page-type/world-class",
  slug: "senators",
  title: "Senators",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
