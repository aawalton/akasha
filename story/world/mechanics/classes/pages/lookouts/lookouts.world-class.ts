import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lookouts = {
  id: "01a0657e-138f-78f6-8aff-9b6091db82c2",
  type: "page-type/world-class",
  slug: "lookouts",
  title: "Lookouts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
