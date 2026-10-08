import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const underworldSurvivor = {
  id: "01a0657e-026e-7036-922e-79ce1ffa76f9",
  type: "page-type/world-class",
  slug: "underworld-survivor",
  title: "Underworld Survivor",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/survivor"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.110Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
