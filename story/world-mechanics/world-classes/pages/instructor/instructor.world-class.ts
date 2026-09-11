import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const instructor = {
  id: "01a0657e-1377-7da0-8f76-ba82082be623",
  type: "world-class",
  slug: "instructor",
  title: "Instructor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
