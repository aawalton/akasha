import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const appraiser = {
  id: "01a0657e-132d-789a-85cb-77ad5d5fffef",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "appraiser",
  title: "Appraiser",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
