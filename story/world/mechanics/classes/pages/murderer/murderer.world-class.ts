import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const murderer = {
  id: "01a0657e-0234-739a-8c25-69099d735687",
  type: "page-type/world-class",
  slug: "murderer",
  title: "Murderer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
