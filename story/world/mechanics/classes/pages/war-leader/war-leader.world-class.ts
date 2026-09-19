import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warLeader = {
  id: "01a0657e-0270-7059-8efc-26b5433fef10",
  type: "page-type/world-class",
  slug: "war-leader",
  title: "War Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
