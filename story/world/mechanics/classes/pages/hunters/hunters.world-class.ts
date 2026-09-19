import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hunters = {
  id: "01a0657e-01fa-738b-8c82-cb3fd5f55262",
  type: "page-type/world-class",
  slug: "hunters",
  title: "Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
