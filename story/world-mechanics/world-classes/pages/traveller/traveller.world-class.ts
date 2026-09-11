import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const traveller = {
  id: "01a06586-0a6c-7e16-a36a-188a1d10f44b",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "traveller",
  title: "Traveller",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
