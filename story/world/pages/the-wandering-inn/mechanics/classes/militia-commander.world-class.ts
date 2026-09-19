import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const militiaCommander = {
  id: "01a0657e-13a2-7c97-ba18-bc230404d378",
  type: "page-type/world-class",
  slug: "militia-commander",
  title: "Militia Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
