import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tennisPlayer = {
  id: "01a0657e-0269-75e7-b8dd-89b31163e065",
  type: "page-type/world-class",
  slug: "tennis-player",
  title: "Tennis Player",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
