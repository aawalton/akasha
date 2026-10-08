import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mintLordOfTheNewEra = {
  id: "01a0657e-13a2-7a5c-845f-86903680d804",
  type: "page-type/world-class",
  slug: "mint-lord-of-the-new-era",
  title: "Mint-Lord of the New Era",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/financier-of-fortunes"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.514Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
