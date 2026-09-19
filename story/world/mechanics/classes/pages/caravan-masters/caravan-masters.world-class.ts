import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravanMasters = {
  id: "01a0657e-1346-7bc3-a115-3075f72fca1d",
  type: "page-type/world-class",
  slug: "caravan-masters",
  title: "Caravan Masters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
