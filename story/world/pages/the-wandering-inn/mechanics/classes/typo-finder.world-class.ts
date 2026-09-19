import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const typoFinder = {
  id: "01a0657e-026e-7ee0-bad2-2aff2cba3217",
  type: "page-type/world-class",
  slug: "typo-finder",
  title: "Typo Finder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
