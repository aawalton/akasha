import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const blacksmith = {
  id: "01a0657e-01bc-74d9-8cd0-a6569c0315ee",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "blacksmith",
  title: "Blacksmith",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
