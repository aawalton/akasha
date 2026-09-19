import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const journalists = {
  id: "01a0657e-020b-720e-893d-a7b97b042ffe",
  type: "page-type/world-class",
  slug: "journalists",
  title: "Journalists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
