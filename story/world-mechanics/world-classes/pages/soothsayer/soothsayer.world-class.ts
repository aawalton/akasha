import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const soothsayer = {
  id: "01a0657e-025c-7a7d-ad29-00ef15c1dd48",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "soothsayer",
  title: "Soothsayer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
