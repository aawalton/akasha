import type { WorldClass } from "../../world-class.page-type.ts"

export const underworldSurvivor = {
  id: "01a0657e-026e-7036-922e-79ce1ffa76f9",
  pageTypeSlug: "world-class",
  slug: "underworld-survivor",
  title: "Underworld Survivor",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["survivor"],
  references: "jsonl",
} as const satisfies WorldClass
