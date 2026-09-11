import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const drinker = {
  id: "01a0657e-01d1-78e6-8345-532e89d91b4d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "drinker",
  title: "Drinker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
