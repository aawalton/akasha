import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greenMages = {
  id: "01a0657e-01e4-7b04-b966-2e1a66fb9a8c",
  type: "page-type/world-class",
  slug: "green-mages",
  title: "Green Mages",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
