import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const adventurers = {
  id: "01a0657e-1326-78eb-b380-b2c86c806022",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "adventurers",
  title: "Adventurers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
