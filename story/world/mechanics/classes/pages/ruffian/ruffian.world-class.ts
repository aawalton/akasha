import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ruffian = {
  id: "01a06586-0a26-7c41-bbe2-9529f190f2c5",
  type: "page-type/world-class",
  slug: "ruffian",
  title: "Ruffian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
