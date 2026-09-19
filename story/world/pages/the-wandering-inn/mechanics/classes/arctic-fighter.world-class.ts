import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const arcticFighter = {
  id: "01a0657e-01ab-7f98-b8e3-662aee6aa272",
  type: "page-type/world-class",
  slug: "arctic-fighter",
  title: "Arctic Fighter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
