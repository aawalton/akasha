import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greatSage = {
  id: "01a0657e-01e4-7ca8-af08-d97645077304",
  type: "page-type/world-class",
  slug: "great-sage",
  title: "Great Sage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
