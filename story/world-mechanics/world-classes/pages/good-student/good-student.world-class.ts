import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const goodStudent = {
  id: "01a0657e-136d-75da-a864-ecb883771a95",
  type: "world-class",
  slug: "good-student",
  title: "Good Student",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
