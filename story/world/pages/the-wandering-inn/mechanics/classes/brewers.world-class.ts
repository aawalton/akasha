import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const brewers = {
  id: "01a0657e-01c0-7610-8d23-7674b1dcbb65",
  type: "page-type/world-class",
  slug: "brewers",
  title: "Brewers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
