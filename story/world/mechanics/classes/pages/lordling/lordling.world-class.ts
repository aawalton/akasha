import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lordling = {
  id: "01a0657e-138f-7fc3-b9c6-49eb7b035f06",
  type: "page-type/world-class",
  slug: "lordling",
  title: "Lordling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
