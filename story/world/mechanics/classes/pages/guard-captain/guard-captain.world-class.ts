import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guardCaptain = {
  id: "01a0657e-01e5-7699-88b9-28f58d2326c5",
  type: "page-type/world-class",
  slug: "guard-captain",
  title: "Guard Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
