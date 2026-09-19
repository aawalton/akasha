import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const commoner = {
  id: "01a0657e-134c-7d0a-8da7-aa3ffd9d398d",
  type: "page-type/world-class",
  slug: "commoner",
  title: "Commoner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
