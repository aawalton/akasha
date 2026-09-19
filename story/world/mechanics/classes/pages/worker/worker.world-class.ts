import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const worker = {
  id: "01a06586-0a84-756f-beeb-9d2f0d3b3c7b",
  type: "page-type/world-class",
  slug: "worker",
  title: "Worker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
