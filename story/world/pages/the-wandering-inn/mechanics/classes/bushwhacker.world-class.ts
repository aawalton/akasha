import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bushwhacker = {
  id: "01a0657e-1341-76bf-b0db-30b6835ea53a",
  type: "page-type/world-class",
  slug: "bushwhacker",
  title: "Bushwhacker",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
