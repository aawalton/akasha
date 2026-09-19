import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scoutLieutenant = {
  id: "01a0657e-024a-7ea5-8449-2fb14f04c42b",
  type: "page-type/world-class",
  slug: "scout-lieutenant",
  title: "Scout Lieutenant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
