import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const juniorWatchmen = {
  id: "01a0657e-1378-7bbd-8ba2-7509fe18f455",
  type: "page-type/world-class",
  slug: "junior-watchmen",
  title: "Junior Watchmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
