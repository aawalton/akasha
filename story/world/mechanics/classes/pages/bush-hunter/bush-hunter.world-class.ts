import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bushHunter = {
  id: "01a0657e-1341-7765-b497-cb61c9322334",
  type: "page-type/world-class",
  slug: "bush-hunter",
  title: "Bush Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
