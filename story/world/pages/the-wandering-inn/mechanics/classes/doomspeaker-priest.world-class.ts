import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doomspeakerPriest = {
  id: "01a0657e-1356-7e2e-b5df-cff8ab9834e7",
  type: "page-type/world-class",
  slug: "doomspeaker-priest",
  title: "Doomspeaker Priest",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  evolvesToSlugs: ["world-class/priest-of-wrath-and-sky"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.438Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
