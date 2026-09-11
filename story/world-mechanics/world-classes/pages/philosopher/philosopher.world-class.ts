import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const philosopher = {
  id: "01a06586-0a06-7742-8731-f4131305afd3",
  type: "world-class",
  slug: "philosopher",
  title: "Philosopher",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
