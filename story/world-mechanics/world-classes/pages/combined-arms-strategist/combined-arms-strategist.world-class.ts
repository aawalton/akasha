import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const combinedArmsStrategist = {
  id: "01a0657e-134c-7a1a-bc8d-d1134cae68f1",
  type: "world-class",
  slug: "combined-arms-strategist",
  title: "Combined Arms Strategist",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["trapsetter-strategist"],
  references: "jsonl",
} as const satisfies WorldClass
