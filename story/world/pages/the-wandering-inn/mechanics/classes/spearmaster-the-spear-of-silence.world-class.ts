import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearmasterTheSpearOfSilence = {
  id: "01a0657e-025d-7780-91cc-d9d236f816a9",
  type: "page-type/world-class",
  slug: "spearmaster-the-spear-of-silence",
  title: "Spearmaster: The Spear of Silence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/spearmaster"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.093Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
