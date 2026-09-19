import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const admiral = {
  id: "01a0657e-1325-7f50-be85-14b62a3dc77a",
  type: "page-type/world-class",
  slug: "admiral",
  title: "Admiral",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
