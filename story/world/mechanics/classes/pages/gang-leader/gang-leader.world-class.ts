import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gangLeader = {
  id: "01a0657e-1366-7a3b-bf8b-08fbae3986ea",
  type: "page-type/world-class",
  slug: "gang-leader",
  title: "Gang Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
