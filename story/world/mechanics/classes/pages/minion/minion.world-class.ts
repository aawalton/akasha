import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const minion = {
  id: "01a0657e-0233-7294-99b6-88186939028c",
  type: "page-type/world-class",
  slug: "minion",
  title: "Minion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
