import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trophyWives = {
  id: "01a06586-0a6d-7c33-90b4-8dd15b9e672c",
  type: "page-type/world-class",
  slug: "trophy-wives",
  title: "Trophy Wives",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
