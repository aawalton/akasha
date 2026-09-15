import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const lancer = {
  id: "01a0657e-021a-7fb5-a91c-933975f3b40a",
  type: "world-class",
  slug: "lancer",
  title: "Lancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
