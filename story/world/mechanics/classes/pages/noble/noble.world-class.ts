import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const noble = {
  id: "01a0657e-13b2-7d79-906c-f44cab49b3df",
  type: "page-type/world-class",
  slug: "noble",
  title: "Noble",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
