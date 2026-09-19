import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gemcutter = {
  id: "01a0657e-01df-7987-a569-3db30f27dcbc",
  type: "page-type/world-class",
  slug: "gemcutter",
  title: "Gemcutter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
