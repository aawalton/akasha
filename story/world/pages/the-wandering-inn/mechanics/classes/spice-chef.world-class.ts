import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spiceChef = {
  id: "01a0657e-025e-760f-b6f6-74a0084d6bb1",
  type: "page-type/world-class",
  slug: "spice-chef",
  title: "Spice Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
