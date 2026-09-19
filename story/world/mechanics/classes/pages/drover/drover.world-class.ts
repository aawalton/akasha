import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drover = {
  id: "01a0657e-01d2-742c-a957-21de1cc65294",
  type: "page-type/world-class",
  slug: "drover",
  title: "Drover",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
