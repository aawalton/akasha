import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const philosopher = {
  id: "01a06586-0a06-7742-8731-f4131305afd3",
  type: "page-type/world-class",
  slug: "philosopher",
  title: "Philosopher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
