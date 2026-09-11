import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sailors = {
  id: "01a06586-0a29-7192-a144-4eed2ba17fc1",
  type: "world-class",
  slug: "sailors",
  title: "Sailors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
