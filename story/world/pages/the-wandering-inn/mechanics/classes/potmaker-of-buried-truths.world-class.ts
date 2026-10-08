import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const potmakerOfBuriedTruths = {
  id: "01a0657e-023e-7a4e-9430-5585d5ed3d97",
  type: "page-type/world-class",
  slug: "potmaker-of-buried-truths",
  title: "Potmaker of Buried Truths",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/potter-of-secrets"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.062Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
