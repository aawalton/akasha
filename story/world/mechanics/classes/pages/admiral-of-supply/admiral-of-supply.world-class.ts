import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const admiralOfSupply = {
  id: "01a0657e-1325-794c-8373-1cca4d50c573",
  type: "page-type/world-class",
  slug: "admiral-of-supply",
  title: "Admiral of Supply",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
