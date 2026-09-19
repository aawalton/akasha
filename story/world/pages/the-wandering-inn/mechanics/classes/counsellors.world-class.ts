import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const counsellors = {
  id: "01a0657e-134f-7218-8560-9d7ba3755aca",
  type: "page-type/world-class",
  slug: "counsellors",
  title: "Counsellors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
