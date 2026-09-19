import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const anarchists = {
  id: "01a0657e-132c-75ff-94fb-ae1e2e861b67",
  type: "page-type/world-class",
  slug: "anarchists",
  title: "Anarchists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
