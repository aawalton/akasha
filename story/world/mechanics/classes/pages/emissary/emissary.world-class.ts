import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emissary = {
  id: "01a0657e-1359-7a41-8d8b-5e8e503570e0",
  type: "page-type/world-class",
  slug: "emissary",
  title: "Emissary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
