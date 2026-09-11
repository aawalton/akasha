import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bowmanOfLoss = {
  id: "01a0657e-01c0-7ee9-8fe1-0f13ae466031",
  type: "world-class",
  slug: "bowman-of-loss",
  title: "Bowman of Loss",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["veteran-scout"],
  references: "jsonl",
} as const satisfies WorldClass
