import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const submarineCaptain = {
  id: "01a06586-0a5e-7e44-8b3f-2c9e7125469d",
  type: "page-type/world-class",
  slug: "submarine-captain",
  title: "Submarine Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
