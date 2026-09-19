import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smoker = {
  id: "01a0657e-025a-735e-8947-700c91ab4674",
  type: "page-type/world-class",
  slug: "smoker",
  title: "Smoker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
