import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const scholar = {
  id: "01a06586-0a2a-7667-a7f4-b3c9599e3924",
  type: "world-class",
  slug: "scholar",
  title: "Scholar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
