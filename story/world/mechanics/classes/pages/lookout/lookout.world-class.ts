import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lookout = {
  id: "01a0657e-021b-7a90-944c-145a196a150f",
  type: "page-type/world-class",
  slug: "lookout",
  title: "Lookout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
