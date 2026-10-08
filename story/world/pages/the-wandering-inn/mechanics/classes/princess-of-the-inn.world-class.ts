import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const princessOfTheInn = {
  id: "01a06586-0a0e-7fe5-aa9e-91578b10d83f",
  type: "page-type/world-class",
  slug: "princess-of-the-inn",
  title: "Princess of the Inn",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  evolvesToSlugs: ["world-class/the-cracked-princess-keeper-of-the-inn"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.350Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
