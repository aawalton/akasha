import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const marathoner = {
  id: "01a0657e-022c-76d9-a457-8800109afcac",
  type: "page-type/world-class",
  slug: "marathoner",
  title: "Marathoner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
