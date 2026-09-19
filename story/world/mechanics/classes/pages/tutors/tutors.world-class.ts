import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tutors = {
  id: "01a06586-0a6d-725e-b71f-31aa24562bea",
  type: "page-type/world-class",
  slug: "tutors",
  title: "Tutors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
