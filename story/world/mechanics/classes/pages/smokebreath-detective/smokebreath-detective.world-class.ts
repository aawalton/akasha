import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smokebreathDetective = {
  id: "01a06586-0a44-7ea1-9fcc-e71607cf32b9",
  type: "page-type/world-class",
  slug: "smokebreath-detective",
  title: "Smokebreath Detective",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["streetwise-guardswoman"],
  references: "jsonl",
} as const satisfies WorldClass
