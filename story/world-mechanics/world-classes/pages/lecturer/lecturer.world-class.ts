import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const lecturer = {
  id: "01a0657e-138d-7d19-a4fe-60b574c7549c",
  type: "world-class",
  slug: "lecturer",
  title: "Lecturer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
