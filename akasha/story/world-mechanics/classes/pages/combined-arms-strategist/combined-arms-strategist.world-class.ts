import type { WorldClass } from "../../world-class.page-type.ts"

export const combinedArmsStrategist = {
  id: "01a0657e-134c-7a1a-bc8d-d1134cae68f1",
  pageTypeSlug: "world-class",
  slug: "combined-arms-strategist",
  title: "Combined Arms Strategist",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["trapsetter-strategist"],
  references: "jsonl",
} as const satisfies WorldClass
