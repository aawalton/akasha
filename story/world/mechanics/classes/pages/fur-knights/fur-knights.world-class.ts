import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const furKnights = {
  id: "01a0657e-1366-73cf-ae3e-eb2b86bf01ea",
  type: "page-type/world-class",
  slug: "fur-knights",
  title: "Fur Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
