import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const footballer = {
  id: "01a0657e-01de-73bc-8187-653c2c3ecb6f",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "footballer",
  title: "Footballer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
