import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const veteranScout = {
  id: "01a06586-0a6f-7e80-b32b-4c26c03aa8f2",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "veteran-scout",
  title: "Veteran Scout",
  world: "the-wandering-inn",
  evolvesToSlugs: ["bowman-of-loss"],
  references: "jsonl",
} as const satisfies WorldClass
