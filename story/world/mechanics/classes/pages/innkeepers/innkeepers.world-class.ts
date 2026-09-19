import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const innkeepers = {
  id: "01a0657e-1377-7cc1-81a8-83e94bee2d6e",
  type: "page-type/world-class",
  slug: "innkeepers",
  title: "Innkeepers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
