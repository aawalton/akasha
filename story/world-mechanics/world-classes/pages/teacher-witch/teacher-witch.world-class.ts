import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const teacherWitch = {
  id: "01a06586-0a64-742f-83de-d642a07d0a8d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "teacher-witch",
  title: "Teacher Witch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
