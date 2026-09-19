import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const actionReporter = {
  id: "01a0657e-01a2-71f6-863b-20d1cd1dbdd9",
  type: "page-type/world-class",
  slug: "action-reporter",
  title: "Action Reporter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
