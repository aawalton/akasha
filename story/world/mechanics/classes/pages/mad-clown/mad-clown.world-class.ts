import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const madClown = {
  id: "01a0657e-0221-76a4-aeb1-57c1d56fb4e1",
  type: "page-type/world-class",
  slug: "mad-clown",
  title: "Mad Clown",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
