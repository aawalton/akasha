import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hoodlums = {
  id: "01a0657e-01f9-72bc-8c41-3363b08458e2",
  type: "page-type/world-class",
  slug: "hoodlums",
  title: "Hoodlums",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
