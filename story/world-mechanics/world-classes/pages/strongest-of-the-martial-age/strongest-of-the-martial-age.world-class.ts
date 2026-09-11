import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const strongestOfTheMartialAge = {
  id: "01a06586-0a5d-77b7-a3a3-6bd5a99119b1",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "strongest-of-the-martial-age",
  title: "Strongest of the Martial Age",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["bridge-of-the-martial-world"],
  references: "jsonl",
} as const satisfies WorldClass
