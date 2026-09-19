import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tourist = {
  id: "01a0657e-026c-7067-9af0-69f2c9557f8a",
  type: "page-type/world-class",
  slug: "tourist",
  title: "Tourist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
