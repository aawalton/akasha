import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const poisoner = {
  id: "01a0657e-023e-7865-9b61-cd2ed3b15dda",
  type: "page-type/world-class",
  slug: "poisoner",
  title: "Poisoner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
