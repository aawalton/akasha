import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const symphonyKnight = {
  id: "01a0657e-0263-78c4-9ad6-ac7ef07b60b2",
  type: "page-type/world-class",
  slug: "symphony-knight",
  title: "Symphony Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
