import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const researcher = {
  id: "01a0657e-0245-7300-bb1a-58b9e9e33b9f",
  type: "page-type/world-class",
  slug: "researcher",
  title: "Researcher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
