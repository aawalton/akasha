import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gatherer = {
  id: "01a0657e-1366-766b-aa22-b3dbc08e7fbf",
  type: "page-type/world-class",
  slug: "gatherer",
  title: "Gatherer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
