import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strategistOfSympathy = {
  id: "01a0657e-0260-70c0-8ce9-c9135128f863",
  type: "page-type/world-class",
  slug: "strategist-of-sympathy",
  title: "Strategist of Sympathy",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/tactician"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.096Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
