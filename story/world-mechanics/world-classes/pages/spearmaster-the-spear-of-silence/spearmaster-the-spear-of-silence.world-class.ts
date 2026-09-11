import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const spearmasterTheSpearOfSilence = {
  id: "01a0657e-025d-7780-91cc-d9d236f816a9",
  type: "world-class",
  slug: "spearmaster-the-spear-of-silence",
  title: "Spearmaster: The Spear of Silence",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["spearmaster"],
  references: "jsonl",
} as const satisfies WorldClass
