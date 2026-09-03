import type { WorldClass } from "../../world-class.page-type.ts"

export const fistOfTheLivingWorld = {
  id: "01a0657e-01dc-7d77-a04f-093a96a3ecfb",
  pageTypeSlug: "world-class",
  slug: "fist-of-the-living-world",
  title: "Fist of the Living World",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["superior-martial-artist"],
  references: "jsonl",
} as const satisfies WorldClass
