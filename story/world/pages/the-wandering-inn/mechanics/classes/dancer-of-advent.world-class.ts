import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dancerOfAdvent = {
  id: "01a0657e-01ce-78c9-a598-f2c06ea9627c",
  type: "page-type/world-class",
  slug: "dancer-of-advent",
  title: "Dancer of Advent",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/dancer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.950Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
