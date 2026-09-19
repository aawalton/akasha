import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stormAdmiral = {
  id: "01a06586-0a54-7c82-a5eb-5ace37da7060",
  type: "page-type/world-class",
  slug: "storm-admiral",
  title: "Storm Admiral",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
