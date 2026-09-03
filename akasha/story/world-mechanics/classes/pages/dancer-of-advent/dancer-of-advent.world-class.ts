import type { WorldClass } from "../../world-class.page-type.ts"

export const dancerOfAdvent = {
  id: "01a0657e-01ce-78c9-a598-f2c06ea9627c",
  pageTypeSlug: "world-class",
  slug: "dancer-of-advent",
  title: "Dancer of Advent",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["dancer"],
  references: "jsonl",
} as const satisfies WorldClass
