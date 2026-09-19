import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tasteTester = {
  id: "01a0657e-0269-7894-a9ac-e8d8747df210",
  type: "page-type/world-class",
  slug: "taste-tester",
  title: "Taste Tester",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
