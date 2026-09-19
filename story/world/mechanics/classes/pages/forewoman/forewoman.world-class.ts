import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const forewoman = {
  id: "01a0657e-1366-7d95-a34f-5be5768b9b71",
  type: "page-type/world-class",
  slug: "forewoman",
  title: "Forewoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
