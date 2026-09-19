import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const editor = {
  id: "01a0657e-01d5-7617-a8cf-3e60f31f85ef",
  type: "page-type/world-class",
  slug: "editor",
  title: "Editor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
