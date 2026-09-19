import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const friends = {
  id: "01a0657e-1366-7c3d-a9d6-fd337ac4fb81",
  type: "page-type/world-class",
  slug: "friends",
  title: "Friends",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
