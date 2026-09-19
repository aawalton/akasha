import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warlocks = {
  id: "01a06586-0a72-7521-a5b8-26aab86a4434",
  type: "page-type/world-class",
  slug: "warlocks",
  title: "Warlocks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
