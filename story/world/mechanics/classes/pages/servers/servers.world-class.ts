import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const servers = {
  id: "01a06586-0a32-70c3-bc23-55bbf1b369a3",
  type: "page-type/world-class",
  slug: "servers",
  title: "Servers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
