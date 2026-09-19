import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tomeMagus = {
  id: "01a06586-0a68-744b-a6fd-0bb2c274574c",
  type: "page-type/world-class",
  slug: "tome-magus",
  title: "Tome Magus",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
