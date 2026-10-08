import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const combinedArmsStrategist = {
  id: "01a0657e-134c-7a1a-bc8d-d1134cae68f1",
  type: "page-type/world-class",
  slug: "combined-arms-strategist",
  title: "Combined Arms Strategist",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/trapsetter-strategist"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.428Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
