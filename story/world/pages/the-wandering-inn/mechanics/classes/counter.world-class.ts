import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const counter = {
  id: "01a0657e-134f-7a47-83eb-9f1bffbbef82",
  type: "page-type/world-class",
  slug: "counter",
  title: "Counter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
