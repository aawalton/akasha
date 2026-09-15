import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const fencingInstructor = {
  id: "01a0657e-01db-79c6-85e7-5cb15c42e73b",
  type: "world-class",
  slug: "fencing-instructor",
  title: "Fencing Instructor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
