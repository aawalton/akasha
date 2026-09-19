import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eliteSoldiers = {
  id: "01a0657e-1359-7863-b12b-c171e6253985",
  type: "page-type/world-class",
  slug: "elite-soldiers",
  title: "Elite Soldiers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
