import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const traitors = {
  id: "01a06586-0a6a-7643-9908-361a353060be",
  type: "page-type/world-class",
  slug: "traitors",
  title: "Traitors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
