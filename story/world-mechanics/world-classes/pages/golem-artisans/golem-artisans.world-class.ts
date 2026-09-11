import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const golemArtisans = {
  id: "01a0657e-136c-7c07-86ba-7abada8b93ea",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "golem-artisans",
  title: "Golem Artisans",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
