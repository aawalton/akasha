import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const thieves = {
  id: "01a06586-0a67-7214-b2a9-10f3e4d1c6e2",
  type: "world-class",
  slug: "thieves",
  title: "Thieves",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
