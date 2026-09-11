import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const avengers = {
  id: "01a0657e-01af-72dc-9db9-e7849742b9cb",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "avengers",
  title: "Avengers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
