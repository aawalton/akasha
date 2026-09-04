import type { WorldClass } from "../../world-class.page-type.ts"

export const auraKnight = {
  id: "01a0657e-01ae-76b7-87bc-211cae4b891f",
  pageTypeSlug: "world-class",
  slug: "aura-knight",
  title: "Aura Knight",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["knight-errant"],
  evolvesToSlugs: ["knight-of-the-dawn"],
  references: "jsonl",
} as const satisfies WorldClass
