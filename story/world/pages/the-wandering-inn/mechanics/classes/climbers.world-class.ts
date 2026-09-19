import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const climbers = {
  id: "01a0657e-01c7-7d22-9110-22284c2a73a4",
  type: "page-type/world-class",
  slug: "climbers",
  title: "Climbers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
