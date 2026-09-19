import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const naturalist = {
  id: "01a0657e-13a3-7624-b10d-ce688c5efbd7",
  type: "page-type/world-class",
  slug: "naturalist",
  title: "Naturalist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
