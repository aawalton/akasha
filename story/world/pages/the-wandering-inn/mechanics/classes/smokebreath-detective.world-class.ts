import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smokebreathDetective = {
  id: "01a06586-0a44-7ea1-9fcc-e71607cf32b9",
  type: "page-type/world-class",
  slug: "smokebreath-detective",
  title: "Smokebreath Detective",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/streetwise-guardswoman"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.404Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
