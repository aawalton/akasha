import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sentries = {
  id: "01a06586-0a2f-7e80-8f41-137e3a9128f2",
  type: "world-class",
  slug: "sentries",
  title: "Sentries",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
