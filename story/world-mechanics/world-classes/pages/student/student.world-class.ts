import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const student = {
  id: "01a06586-0a5e-73a0-ba9f-041167145309",
  type: "world-class",
  slug: "student",
  title: "Student",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
