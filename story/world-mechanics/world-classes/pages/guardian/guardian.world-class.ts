import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const guardian = {
  id: "01a0657e-01e7-78fa-a91f-bac3552e4dd3",
  type: "world-class",
  slug: "guardian",
  title: "Guardian",
  world: "the-wandering-inn",
  evolvesToSlugs: ["skeleton-knight"],
  references: "jsonl",
} as const satisfies WorldClass
