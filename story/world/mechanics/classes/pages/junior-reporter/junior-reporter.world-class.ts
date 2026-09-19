import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const juniorReporter = {
  id: "01a0657e-1378-7550-876b-914e346b2edd",
  type: "page-type/world-class",
  slug: "junior-reporter",
  title: "Junior Reporter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
