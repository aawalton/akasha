import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const arborist = {
  id: "01a0657e-01a8-7add-a5f5-0a48726e3abe",
  type: "page-type/world-class",
  slug: "arborist",
  title: "Arborist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
