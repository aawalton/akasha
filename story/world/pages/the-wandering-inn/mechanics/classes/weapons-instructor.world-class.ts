import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponsInstructor = {
  id: "01a06586-0a76-73d7-b35a-3a92475b23bb",
  type: "page-type/world-class",
  slug: "weapons-instructor",
  title: "Weapons Instructor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
