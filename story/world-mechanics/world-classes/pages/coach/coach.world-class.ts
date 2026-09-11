import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const coach = {
  id: "01a0657e-134b-79ab-a16e-b45c38b894cd",
  type: "world-class",
  slug: "coach",
  title: "Coach",
  world: "the-wandering-inn",
  evolvesToSlugs: ["famed-coach"],
  references: "jsonl",
} as const satisfies WorldClass
