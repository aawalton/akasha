import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smokers = {
  id: "01a06586-0a44-7f34-9c18-5a969f5a7e0d",
  type: "page-type/world-class",
  slug: "smokers",
  title: "Smokers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
