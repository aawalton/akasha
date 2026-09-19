import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalSpeaker = {
  id: "01a0657e-0249-779b-81fa-d8ccec884ba7",
  type: "page-type/world-class",
  slug: "royal-speaker",
  title: "Royal Speaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
