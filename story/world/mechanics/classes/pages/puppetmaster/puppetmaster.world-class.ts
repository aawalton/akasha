import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const puppetmaster = {
  id: "01a0657e-0241-7fb5-9ba9-6300d954e9b8",
  type: "page-type/world-class",
  slug: "puppetmaster",
  title: "Puppetmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
