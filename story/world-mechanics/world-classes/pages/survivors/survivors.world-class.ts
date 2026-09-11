import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const survivors = {
  id: "01a06586-0a60-725f-a55b-975376b25e56",
  type: "world-class",
  slug: "survivors",
  title: "Survivors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
