import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordSaint = {
  id: "01a0657e-0263-7227-a30a-1d2132fd6fe4",
  type: "page-type/world-class",
  slug: "sword-saint",
  title: "Sword Saint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
