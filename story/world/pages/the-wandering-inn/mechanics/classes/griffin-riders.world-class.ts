import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const griffinRiders = {
  id: "01a0657e-136e-77bc-b0c1-156b67b5184a",
  type: "page-type/world-class",
  slug: "griffin-riders",
  title: "Griffin Riders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
