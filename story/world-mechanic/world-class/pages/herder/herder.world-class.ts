import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const herder = {
  id: "01a0657e-01f7-73b8-905f-eae422c647e6",
  type: "world-class",
  slug: "herder",
  title: "Herder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
