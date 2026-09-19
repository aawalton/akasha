import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scrounger = {
  id: "01a0657e-024b-70ef-acf1-f93c1cfcdf0b",
  type: "page-type/world-class",
  slug: "scrounger",
  title: "Scrounger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
