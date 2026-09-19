import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prodigalStudent = {
  id: "01a06586-0a18-7bbe-8e18-eb746ac5c45a",
  type: "page-type/world-class",
  slug: "prodigal-student",
  title: "Prodigal Student",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
