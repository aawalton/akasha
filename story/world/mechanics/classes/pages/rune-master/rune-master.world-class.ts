import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const runeMaster = {
  id: "01a06586-0a27-7a10-8911-c64703176e0f",
  type: "page-type/world-class",
  slug: "rune-master",
  title: "Rune Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
