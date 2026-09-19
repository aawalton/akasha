import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const famousGuitarist = {
  id: "01a0657e-01da-7125-ac67-fc77b83b5a03",
  type: "page-type/world-class",
  slug: "famous-guitarist",
  title: "Famous Guitarist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
