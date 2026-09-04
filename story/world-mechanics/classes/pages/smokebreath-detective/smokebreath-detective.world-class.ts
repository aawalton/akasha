import type { WorldClass } from "../../world-class.page-type.ts"

export const smokebreathDetective = {
  id: "01a06586-0a44-7ea1-9fcc-e71607cf32b9",
  pageTypeSlug: "world-class",
  slug: "smokebreath-detective",
  title: "Smokebreath Detective",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["streetwise-guardswoman"],
  references: "jsonl",
} as const satisfies WorldClass
