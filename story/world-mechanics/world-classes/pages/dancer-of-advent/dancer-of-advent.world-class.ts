import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const dancerOfAdvent = {
  id: "01a0657e-01ce-78c9-a598-f2c06ea9627c",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "dancer-of-advent",
  title: "Dancer of Advent",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["dancer"],
  references: "jsonl",
} as const satisfies WorldClass
