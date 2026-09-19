import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterEngineer = {
  id: "01a0657e-139e-7606-8387-a87f6c99e351",
  type: "page-type/world-class",
  slug: "master-engineer",
  title: "Master Engineer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
