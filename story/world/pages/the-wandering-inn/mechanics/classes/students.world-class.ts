import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const students = {
  id: "01a06586-0a5e-727e-9654-62405981c539",
  type: "page-type/world-class",
  slug: "students",
  title: "Students",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
