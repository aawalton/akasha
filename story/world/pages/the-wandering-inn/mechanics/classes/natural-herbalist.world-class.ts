import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const naturalHerbalist = {
  id: "01a0657e-13a3-708a-842c-ded51896eb9c",
  type: "page-type/world-class",
  slug: "natural-herbalist",
  title: "Natural Herbalist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
