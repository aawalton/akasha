import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const roofer = {
  id: "01a0657e-0248-7494-b9df-234da66a371a",
  type: "page-type/world-class",
  slug: "roofer",
  title: "Roofer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
