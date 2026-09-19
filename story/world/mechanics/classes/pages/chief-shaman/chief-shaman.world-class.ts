import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chiefShaman = {
  id: "01a0657e-01c5-746e-8604-6a3ea72bb74d",
  type: "page-type/world-class",
  slug: "chief-shaman",
  title: "Chief Shaman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
