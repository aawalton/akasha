import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const groom = {
  id: "01a0657e-136e-739a-a031-9b1ffa3c369c",
  type: "page-type/world-class",
  slug: "groom",
  title: "Groom",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
