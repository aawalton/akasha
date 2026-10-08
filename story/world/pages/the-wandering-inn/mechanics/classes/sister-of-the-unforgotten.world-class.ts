import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sisterOfTheUnforgotten = {
  id: "01a06586-0a3e-7195-a59f-a1e880ac4cf5",
  type: "page-type/world-class",
  slug: "sister-of-the-unforgotten",
  title: "Sister of the Unforgotten",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/covert-wing-captain"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.398Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
