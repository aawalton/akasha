import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const outriders = {
  id: "01a0657e-0235-735f-8ee7-1563f74c99e5",
  type: "page-type/world-class",
  slug: "outriders",
  title: "Outriders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
