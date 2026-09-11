import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const smokebreathDetective = {
  id: "01a06586-0a44-7ea1-9fcc-e71607cf32b9",
  type: "world-class",
  slug: "smokebreath-detective",
  title: "Smokebreath Detective",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["streetwise-guardswoman"],
  references: "jsonl",
} as const satisfies WorldClass
