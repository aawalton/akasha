import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shamanOfTheOldWays = {
  id: "01a06586-0a32-7afa-b41a-d293d2cfc293",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shaman-of-the-old-ways",
  title: "Shaman of the Old Ways",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["magic-paint-shaman"],
  evolvesToSlugs: ["mirmilin-es-hivule-sekururu"],
  references: "jsonl",
} as const satisfies WorldClass
