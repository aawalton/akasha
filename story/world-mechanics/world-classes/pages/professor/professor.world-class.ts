import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const professor = {
  id: "01a06586-0a18-7f64-99e7-bf6082542b42",
  type: "world-class",
  slug: "professor",
  title: "Professor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
