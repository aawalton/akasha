import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const potmakerOfBuriedTruths = {
  id: "01a0657e-023e-7a4e-9430-5585d5ed3d97",
  type: "world-class",
  slug: "potmaker-of-buried-truths",
  title: "Potmaker of Buried Truths",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["potter-of-secrets"],
  references: "jsonl",
} as const satisfies WorldClass
