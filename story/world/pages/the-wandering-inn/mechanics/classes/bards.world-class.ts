import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bards = {
  id: "01a0657e-01b1-7b05-9f69-b002d14e505b",
  type: "page-type/world-class",
  slug: "bards",
  title: "Bards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
