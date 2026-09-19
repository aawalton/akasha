import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const undergroundHealer = {
  id: "01a0657e-026e-74f0-8017-b1f90f9aa2dd",
  type: "page-type/world-class",
  slug: "underground-healer",
  title: "Underground Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
