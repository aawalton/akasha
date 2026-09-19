import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const windRunner = {
  id: "01a06586-0a76-71fe-80e7-3918a9025d66",
  type: "page-type/world-class",
  slug: "wind-runner",
  title: "Wind Runner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
