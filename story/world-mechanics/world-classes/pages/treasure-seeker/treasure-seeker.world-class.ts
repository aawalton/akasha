import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const treasureSeeker = {
  id: "01a0657e-026d-7bad-967c-d7aa67d20c63",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "treasure-seeker",
  title: "Treasure Seeker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
