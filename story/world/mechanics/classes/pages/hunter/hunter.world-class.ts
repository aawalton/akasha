import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hunter = {
  id: "01a0657e-1375-7ece-a84b-3e25e916dbaf",
  type: "page-type/world-class",
  slug: "hunter",
  title: "Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
