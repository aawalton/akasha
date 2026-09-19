import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cultivator = {
  id: "01a0657e-1351-7bc0-b151-6c9aadce6544",
  type: "page-type/world-class",
  slug: "cultivator",
  title: "Cultivator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
