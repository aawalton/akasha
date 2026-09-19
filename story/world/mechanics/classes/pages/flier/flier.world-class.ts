import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const flier = {
  id: "01a0657e-1365-7dde-9b51-d4568a87db74",
  type: "page-type/world-class",
  slug: "flier",
  title: "Flier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
