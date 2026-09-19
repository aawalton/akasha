import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const watcher = {
  id: "01a0657e-0270-7c3e-9cd4-19107e1f9134",
  type: "page-type/world-class",
  slug: "watcher",
  title: "Watcher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
