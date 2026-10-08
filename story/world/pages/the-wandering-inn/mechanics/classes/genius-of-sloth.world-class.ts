import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const geniusOfSloth = {
  id: "01a0657e-136b-782a-8715-a37d8fe1ec86",
  type: "page-type/world-class",
  slug: "genius-of-sloth",
  title: "Genius of Sloth",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/hedonistic-wastrel"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.459Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
