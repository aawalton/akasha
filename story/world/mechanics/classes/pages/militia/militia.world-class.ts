import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const militia = {
  id: "01a0657e-0232-7921-895a-c65d92b6b4fa",
  type: "page-type/world-class",
  slug: "militia",
  title: "Militia",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
