import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const trainer = {
  id: "01a06586-0a6a-72ed-90a2-d1c10c7aa057",
  type: "world-class",
  slug: "trainer",
  title: "Trainer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
