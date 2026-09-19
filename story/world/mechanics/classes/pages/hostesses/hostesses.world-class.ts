import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hostesses = {
  id: "01a0657e-1374-7a7b-88a2-de1f772b802a",
  type: "page-type/world-class",
  slug: "hostesses",
  title: "Hostesses",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
