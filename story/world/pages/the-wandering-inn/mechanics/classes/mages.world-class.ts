import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mages = {
  id: "01a0657e-139a-7f31-9f7f-b8b08a90df3a",
  type: "page-type/world-class",
  slug: "mages",
  title: "Mages",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
