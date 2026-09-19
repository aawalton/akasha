import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const teacher = {
  id: "01a0657e-0269-7010-8e6b-bb4ad82cc317",
  type: "page-type/world-class",
  slug: "teacher",
  title: "Teacher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
